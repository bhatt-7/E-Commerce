const Product = require('../models/productSchema');

const createProduct = async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        const userId = req.user.id;
        console.log("creater Id:", userId);

        const newProduct = new Product({
            title,
            description,
            price,
            image,
            userId
        });
        console.log("newProduct", newProduct);
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }

    //Lazy loading

    // const page = parseInt(req.query.page) || 1;  // Page number from query
    // const limit = parseInt(req.query.limit) || 10;  // Limit per page

    // try {
    //     const startIndex = (page - 1) * limit;   // Calculate offset
    //     const products = await Product.find().skip(startIndex).limit(limit);  // Fetch products

    //     const totalProducts = await Product.countDocuments();  // Total product count

    //     res.json({
    //         total: totalProducts,
    //         page,
    //         limit,
    //         products
    //     });
    // } catch (error) {
    //     console.error("Error fetching products:", error);
    //     res.status(500).json({ message: "Server error" });
    // }
};
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {

        const deletedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
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
        const { title, description, price, image, quantity } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, description, price, image, quantity },
            { new: true }
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

const getProductsForAuthenticatedUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const products = await Product.find({ userId: userId, isDeleted: false });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this user' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching user's products:", error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

const decreaseQuantity = async (req, res) => {
    try {
        console.log('entered decrease quantity')
        const { products } = req.body;
        console.log("products:", products);

        const updatedProducts = await Product.updateMany({ _id: { $in: products } }, { $inc: { quantity: -1 } });
        if (updatedProducts.modifiedCount === 0) {
            return res.status(404).json({ message: 'No products found for this user' });
        }

        res.status(200).json({ message: 'Quantity decreased successfully' });
    } catch (error) {
        console.error("Error decreasing quantity:", error);
        res.status(500).json({ message: 'Failed to decrease quantity', error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getProductsForAuthenticatedUser,
    decreaseQuantity,
};
