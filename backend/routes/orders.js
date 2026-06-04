const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

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
    const { items, shippingAddress, totalAmount } = req.body;
    
    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Create order with userId from token
    const order = new Order({
      userId: req.user.userId,
      items,
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', async (req, res) => {
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