const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

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

// POST /api/payment/create-order
// Creates a Razorpay order and a pending DB order
router.post('/create-order', auth, async (req, res) => {
  try {
    let razorpay;
    try {
      razorpay = getRazorpay();
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
    
    const { items, shippingAddress, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create Razorpay order (amount in paise)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { userId: req.user.userId.toString() }
    });

    // Save pending order to MongoDB
    const order = new Order({
      userId: req.user.userId,
      items,
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
    res.status(500).json({ message: 'Failed to create order', error: error.message });
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
        await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed' });
        return res.status(400).json({ message: 'Payment verification failed' });
      }
    }


    // Update order as paid
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'paid',
        status: 'processing',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      },
      { new: true }
    );

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
    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed', status: 'cancelled' });
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

