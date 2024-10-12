// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/productController');
const { authenticateToken } = require('../middlewares/auth');  // Import middleware

// Protect the product creation route
router.post('/create', authenticateToken, createProduct);

// Fetch all products route (no authentication required)
router.get('/all', getAllProducts);

module.exports = router;
