// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/productController');

// Route to create a new product
router.post('/create', createProduct);

// Route to fetch all products
router.get('/all', getAllProducts);

module.exports = router;
