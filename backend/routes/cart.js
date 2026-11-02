const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

const getProductId = (p) => {
  if (!p) return null;
  return p._id ? p._id.toString() : p.toString();
};

// Get user cart (User access)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.cart || []);
  } catch (error) {
    console.error('Get cart error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add to cart (User access)
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, size } = req.body;
    if (!size) return res.status(400).json({ msg: 'Size is required' });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Check if product already in cart
    const existingItemIndex = user.cart.findIndex(
      item => getProductId(item.product) === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += Number(quantity);
    } else {
      user.cart.push({
        product: productId,
        quantity: Number(quantity),
        size
      });
    }

    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    console.error('Add to cart error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update cart item quantity (User access)
router.put('/:productId', auth, async (req, res) => {
  try {
    const { quantity, size } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const itemIndex = user.cart.findIndex(
      item => getProductId(item.product) === req.params.productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    user.cart[itemIndex].quantity = Number(quantity);
    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    console.error('Update cart error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Remove from cart (User access)
router.delete('/:productId', auth, async (req, res) => {
  try {
    const { size } = req.body;
    if (!size) return res.status(400).json({ msg: 'Size is required to remove item' });
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.cart = user.cart.filter(
      item => !(getProductId(item.product) === req.params.productId && item.size === size)
    );
    
    await user.save();
    await user.populate('cart.product');
    
    res.json(user.cart);
  } catch (error) {
    console.error('Remove from cart error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Clear cart (User access)
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.cart = [];
    await user.save();
    
    res.json({ msg: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
