const router = require('express').Router();
const User = require('../models/userSchema');
const { sendOTP, verifyOtp, login, logout,forgotPassword, resetPassword, prevOrders } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/auth');


router.get('/', (req, res) => {
    res.send("Hello World");
});

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.get('/orders',authenticateToken,prevOrders);
module.exports = router