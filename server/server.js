const express = require("express");
const app = express();
const { db } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
db();