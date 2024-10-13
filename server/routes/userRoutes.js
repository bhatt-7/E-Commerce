const router = require('express').Router();
const User = require('../models/userSchema');
const { sendOTP, verifyOtp, login, logout } = require('../controllers/userController');
router.get('/', (req, res) => {
    res.send("Hello World");
});

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/logout',logout)
module.exports = router