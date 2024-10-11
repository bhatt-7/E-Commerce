const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = 'secret_key';

// Middleware for verifying the JWT token
exports.authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        // console.log('middleware wala token',token);
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token is missing' });
        }

        try {
            const decode = jwt.verify(token, secretKey);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Token is invalid' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Something went wrong while validating the token' });
    }
}