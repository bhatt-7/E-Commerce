// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
// const secretKey = process.env.JWT_SECRET || 'hello123';  // Use env variable if set, fallback to default

// // Middleware for verifying the JWT token
// exports.authenticateToken = async (req, res, next) => {
//     try {
//         console.log('Entered JWT Authentication Middleware');

//         const tokenFromCookie = req.cookies?.token;
//         const tokenFromBody = req.body?.token;
//         const tokenFromHeader = req.header("Authorization")?.replace("Bearer ", "");

//         const token = tokenFromCookie || tokenFromBody || tokenFromHeader;

//         console.log("Extracted token from:", {
//             cookies: tokenFromCookie,
//             body: tokenFromBody,
//             header: tokenFromHeader,
//         });

//         if (!token) {
//             console.error("Token missing from request");
//             return res.status(401).json({ success: false, message: 'Token is missing' });
//         }

//         try {
//             // Verify the token
//             const decoded = jwt.verify(token, secretKey);
//             console.log("Token decoded successfully:", decoded);
//             req.user = decoded;  
//         } catch (err) {
//             console.error("Invalid token:", err.message);
//             return res.status(401).json({ success: false, message: 'Token is invalid' });
//         }

//         next();  
//     } catch (error) {
//         console.error("Error in authentication middleware:", error.message);
//         return res.status(401).json({ success: false, message: 'Something went wrong while validating the token' });
//     }
// };


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = 'hello123'; // Make sure this matches the one used during login

// Middleware for verifying the JWT token
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
            console.log("Token decoded successfully:", decoded);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Token is invalid' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Something went wrong while validating the token' });
    }
};
