const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get all products (Public access - users can view)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const query = {};

    // Filter by Category
    if (req.query.category && req.query.category !== 'all' && req.query.category !== 'All') {
      query.category = { $regex: new RegExp(`^${req.query.category}$`, 'i') };
    }

    // Filter by Featured
    if (req.query.featured === 'true') {
      query.featured = true;
    }

    // Filter by Search (name or description)
    if (req.query.search && req.query.search.trim()) {
      const searchRegex = new RegExp(req.query.search.trim(), 'i');
      query.$or = [{ name: searchRegex }, { description: searchRegex }];
    }

    // Filter by Price Range
    if (req.query.priceRange) {
      if (req.query.priceRange === '0-200') query.price = { $gte: 0, $lte: 200 };
      else if (req.query.priceRange === '200-300') query.price = { $gte: 200, $lte: 300 };
      else if (req.query.priceRange === '300-700') query.price = { $gte: 300, $lte: 700 };
      else if (req.query.priceRange === '700+') query.price = { $gte: 700 };
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (req.query.sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (req.query.sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (req.query.sort === 'newest') {
      sortOption = { createdAt: -1 };
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query)
    ]);

    res.json({
      products,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
      total
    });
  } catch (err) {
    console.error('Fetch products error:', err.message);
    res.status(500).json({ msg: 'Server error fetching products' });
  }
});

// Get single product (Public access - users can view)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Fetch product error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create product (Admin only)
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err.message);
    res.status(500).json({ msg: 'Server error creating product' });
  }
});

// Update product (Admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Update product error:', err.message);
    res.status(500).json({ msg: 'Server error updating product' });
  }
});

// Delete product (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error('Delete product error:', err.message);
    res.status(500).json({ msg: 'Server error deleting product' });
  }
});

module.exports = router;
