const jwt = require('jsonwebtoken'); 
const secretKey = process.env.JWT_SECRET; 

exports.authenticateToken = async (req, res, next) => {
    try {
        
        const token = req.cookies.token; 

        console.log("Extracted token:", token);

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token is missing' });
        }

        try {
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded; 
            console.log("Decoded token:", req.user);
        } catch (err) {
            console.error("Token verification error:", err); 
            return res.status(401).json({ success: false, message: 'Token is invalid' });
        }

        next(); 
    } catch (error) {
        console.error("Error in authentication middleware:", error); 
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