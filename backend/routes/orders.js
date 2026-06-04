const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const mongoose = require('mongoose');

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

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    validateShippingAddress(shippingAddress);
    const { orderItems, totalAmount } = await buildOrderItems(items);
    
    // Create order with userId from token
    const order = new Order({
      userId: req.user.userId,
      items: orderItems,
      shippingAddress,
      totalAmount
    });
    
    await order.save();
    
    // Update product stock (optional for MVP)
    // for (const item of items) {
    //   await Product.findByIdAndUpdate(item.productId, { 
    //     $inc: { stock: -item.quantity } 
    //   });
    // }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order', error: error.message });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.userId.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You do not have access to this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
