const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const otpStore = new Map();
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('../models/productSchema');
const Order = require('../models/orderSchema');


const JWT_SECRET = 'hello123';
const JWT_EXPIRES_IN = '24h';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'projectera678@gmail.com',
        pass: 'fftf nlqv nrbz xtng'
    }
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const OTP_EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const otp = generateOTP();
        console.log(otp);

        // Store OTP and its expiration time
        const expirationTime = Date.now() + OTP_EXPIRATION_TIME;
        otpStore.set(email, { otp, expirationTime });
        console.log(otpStore);
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 2 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "OTP sent to email", email });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp, password, name, isAdmin, role } = req.body;
        console.log(req.body)

        // if (!email || !otp || !name || !password || !isAdmin || !role) {
        //     return res.status(400).json({ message: "Email, OTP, and Name are required" });
        // }

        const otpData = otpStore.get(email);
        console.log(otpData);
        if (!otpData) {
            return res.status(400).json({ message: "OTP not found or expired" });
        }

        const { otp: storedOtp, expirationTime } = otpData;
        if (Date.now() > expirationTime) {
            otpStore.delete(email); // Remove expired OTP
            return res.status(400).json({ message: "OTP has expired" });
        }

        if (storedOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //use regex to make password validation

        const user = new User({ name, email, password: hashedPassword, isAdmin, role });
        user.isVerified = true;
        await user.save();

        otpStore.delete(email);

        return res.status(200).json({ message: "User created successfully", user });
    } catch (error) {
        console.log(error);
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.cookie('token', token, {
            httpOnly: false,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({ message: "Error logging out", error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'projectera678@gmail.com',
                pass: 'fftf nlqv nrbz xtng'
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Invalid token' });
        }


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        console.log(password)

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
    }
};

exports.prevOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderDetails = await Order.find({ user: user._id }).populate({
            path: "products.product",
            model: "Product",
            select: "title description price image",
        });

        const formattedOrders = orderDetails.map(order => ({
            orderId: order.orderId,
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            totalAmount: order.totalAmount,
            products: order.products.map(product => ({
                title: product.product.title,
                description: product.product.description,
                price: product.product.price,
                image: product.product.image,
                quantity: product.quantity,
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: "Error retrieving orders", error: error.message });
    }
};
