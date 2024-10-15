// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/productController');
const { authenticateToken, verifyAdmin } = require('../middlewares/auth');  // Import middleware

// Protect the product creation route
router.post('/create', authenticateToken, createProduct);

// Fetch all products route (no authentication required)
router.get('/all', getAllProducts);
router.delete('/:id', authenticateToken, verifyAdmin, deleteProduct);
router.put('/:id', authenticateToken, verifyAdmin, updateProduct);

module.exports = router;
