const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = 'hello123';

// Middleware for verifying the JWT token
exports.authenticateToken = async (req, res, next) => {
    try {
        console.log('Entered JWT Authentication Middleware');

        // Check where the token is coming from (cookies, body, or header)
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

        console.log("Extracted token:", token);

        if (!token) {
            console.error("Token missing from request");
            return res.status(401).json({ success: false, message: 'Token is missing' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, secretKey);
            console.log("Token decoded successfully:", decoded);
            req.user = decoded; // Store user data in request object
        } catch (err) {
            console.error("Invalid token:", err.message);
            return res.status(401).json({ success: false, message: 'Token is invalid' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in authentication middleware:", error.message);
        return res.status(401).json({ success: false, message: 'Something went wrong while validating the token' });
    }
};
