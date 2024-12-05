// const express = require("express");
// const app = express();
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const { db } = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/carts', cartRoutes)
// app.use('/api/payments', paymentRoutes);

// app.get('/', (req, res) => {
//     res.send("Hello World");
// })

// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });
// db();
const express = require("express");
const app = express();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { db } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { write } = require("fs");

const apiLimiter = rateLimit({
    windowMs: 20 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests recieved from same IP, Please try again after 1 minute."
    },
    status: 429,        
    skip: function (req, res) {
        if (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].length > 0) {
            return true;
        }
        return false;
    }
});

app.use(apiLimiter);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

db();