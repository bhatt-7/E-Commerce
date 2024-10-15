// controllers/productController.js
const Product = require('../models/productSchema');

// Controller to create a new product
const createProduct = async (req, res) => {
    try {
        const { title, description, price, image } = req.body;

        const newProduct = new Product({
            title,
            description,
            price,
            image
        });
        console.log(newProduct);
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
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the product by its ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, description, price, image } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, description, price, image },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
};
