const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const otpStore = new Map();
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


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

        if (!email || !otp || !name || !password || !isAdmin || !role) {
            return res.status(400).json({ message: "Email, OTP, and Name are required" });
        }

        const otpData = otpStore.get(email);
        if (!otpData) {
            return res.status(400).json({ message: "OTP not found or expired" });
        }

        // Check if the OTP is expired
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
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
};

// exports.login = async (req, res) => {
//     console.log("req.body", req.body);
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         // Find the user by email
//         const user = await User.findOne({ email });
//         console.log(user);
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // Check if the password matches
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Create a payload with user data (you can include more fields if needed)
//         const payload = {
//             id: user._id,
//             email: user.email,
//             name: user.name // Assuming the user schema has a name field
//         };

//         // Generate a JWT token
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
//         //set token in cookie
//         res.cookie('token', token, {
//             httpOnly: true,
//             sameSite: 'None',
//             secure: true,
//             maxAge: 2 * 60 * 60 * 1000
//         })

//         res.status(200).json({ message: "Login successful", token });


//     } catch (error) {
//         console.error("Error logging in:", error);
//         return res.status(500).json({ message: "Error logging in", error: error.message });
//     }
// };

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

        // Add the user's role to the JWT payload
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

        // Generate a reset token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'projectera678@gmail.com',
                pass: 'fftf nlqv nrbz xtng'
            },
        });

        // Send email with reset link
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