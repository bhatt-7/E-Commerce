const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, deleteProduct, updateProduct, getProductsForAuthenticatedUser, decreaseQuantity } = require('../controllers/productController');
const { authenticateToken, verifyAdmin } = require('../middlewares/auth');

router.post('/create', authenticateToken, createProduct);

router.get('/all', getAllProducts);
router.delete('/:id', authenticateToken, verifyAdmin, deleteProduct);
router.put('/:id', authenticateToken, verifyAdmin, updateProduct);
router.get('/my-products', authenticateToken, verifyAdmin, getProductsForAuthenticatedUser);
router.put('/decrease-quantity', authenticateToken, decreaseQuantity);

module.exports = router;
