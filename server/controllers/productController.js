// controllers/productController.js
const Product = require('../models/productSchema');

// Controller to create a new product
const createProduct = async (req, res) => {
    try {
        const { title, description, price, image } = req.body;

        const newProduct = new Product({
            id: Date.now(), // Use Date.now() for unique ID
            title,
            description,
            price,
            image
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

// Controller to fetch all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts
};
