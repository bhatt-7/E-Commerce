const jwt = require('jsonwebtoken'); // Ensure you have jwt imported
const secretKey = process.env.JWT_SECRET; // Make sure this is defined in your environment

exports.authenticateToken = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token; // Since httpOnly is false, you can access it directly

        console.log("Extracted token:", token);

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token is missing' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded; // Store the user data in the request object for further use
            console.log("Decoded token:", req.user); // Log the decoded user data
        } catch (err) {
            console.error("Token verification error:", err); // Log the error for debugging
            return res.status(401).json({ success: false, message: 'Token is invalid' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in authentication middleware:", error); // Log any unexpected error
        return res.status(500).json({ success: false, message: 'Something went wrong while validating the token' });
    }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
};