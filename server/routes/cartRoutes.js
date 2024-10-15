const express = require("express");
const router = express.Router();
const { addToCart, removeFromCart, getCart,deleteFromCart } = require("../controllers/cartController");

const { authenticateToken } = require("../middlewares/auth");

router.post("/add", authenticateToken, addToCart);
router.post("/remove", authenticateToken, removeFromCart);
router.get('/cart', authenticateToken, getCart);
router.delete('/cart/:productId',authenticateToken, deleteFromCart);
module.exports = router