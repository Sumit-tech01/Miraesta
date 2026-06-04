const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');
const mongoose = require('mongoose');

// Initialize Razorpay only if valid keys are provided
const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret || keyId.includes('placeholder')) {
    throw new Error('Invalid Razorpay keys. Please add valid test keys from razorpay.com dashboard.');
  }
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
};

const validateShippingAddress = (shippingAddress = {}) => {
  const required = ['name', 'phone', 'addressLine1', 'city', 'state', 'postalCode'];
  const missing = required.filter((field) => !shippingAddress[field]);

  if (missing.length > 0) {
    throw new Error(`Missing shipping address fields: ${missing.join(', ')}`);
  }

  if (!/^\d{10}$/.test(String(shippingAddress.phone))) {
    throw new Error('Phone must be a 10-digit number');
  }
};

const buildOrderItems = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty');
  }

  const requested = items.map((item) => ({
    productId: item.productId || item.id,
    quantity: Number(item.quantity || item.qty),
    size: item.size || 'M'
  }));

  for (const item of requested) {
    if (!mongoose.Types.ObjectId.isValid(item.productId)) {
      throw new Error('Invalid product in cart');
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
      throw new Error('Invalid item quantity');
    }
  }

  const products = await Product.find({
    _id: { $in: requested.map((item) => item.productId) },
    inStock: true
  });
  const productsById = new Map(products.map((product) => [product._id.toString(), product]));

  let totalAmount = 0;
  const orderItems = requested.map((item) => {
    const product = productsById.get(item.productId.toString());
    if (!product) {
      throw new Error('One or more products are unavailable');
    }

    totalAmount += product.price * item.quantity;

    return {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
      size: item.size
    };
  });

  return { orderItems, totalAmount };
};

// POST /api/payment/create-order
// Creates a Razorpay order and a pending DB order.
router.post('/create-order', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    validateShippingAddress(shippingAddress);
    const { orderItems, totalAmount } = await buildOrderItems(items);
    const isTestMode = process.env.RAZORPAY_KEY_ID === 'rzp_test_placeholder';

    let razorpayOrder = {
      id: `test_order_${Date.now()}`,
      amount: Math.round(totalAmount * 100),
      currency: 'INR'
    };

    if (!isTestMode) {
      const razorpay = getRazorpay();

      // Create Razorpay order (amount in paise)
      razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: { userId: req.user.userId.toString() }
      });
    }

    // Save pending order to MongoDB
    const order = new Order({
      userId: req.user.userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      status: 'pending',
      paymentStatus: 'pending',
      razorpayOrderId: razorpayOrder.id
    });

    await order.save();

    res.status(201).json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(400).json({ message: 'Failed to create order', error: error.message });
  }
});

// POST /api/payment/verify
// Verifies Razorpay signature and marks order as paid
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Allow test payments when using placeholder keys
    const isTestMode = process.env.RAZORPAY_KEY_ID === 'rzp_test_placeholder';
    if (!isTestMode) {
      // Verify signature only in production
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        await Order.findOneAndUpdate(
          { _id: orderId, userId: req.user.userId },
          { paymentStatus: 'failed' }
        );
        return res.status(400).json({ message: 'Payment verification failed' });
      }
    }


    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId: req.user.userId },
      {
        paymentStatus: 'paid',
        status: 'processing',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Payment verified', order });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});

// POST /api/payment/failed
// Marks order as failed
router.post('/failed', auth, async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findOneAndUpdate(
      { _id: orderId, userId: req.user.userId },
      { paymentStatus: 'failed', status: 'cancelled' }
    );
    res.json({ message: 'Order marked as failed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/payment/test-create-order
// Test route to verify payment router connectivity without auth
router.post('/test-create-order', async (req, res) => {
  try {
    res.json({
      message: 'Payment route working',
      razorpayConnected: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
