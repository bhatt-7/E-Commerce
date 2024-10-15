const express = require('express');
const Cart = require('../models/cartSchema');
const Product = require('../models/productSchema');
const User = require('../models/userSchema');

exports.addToCart = async (req, res) => {
    const { productId } = req.body; // This should get the productId correctly
    const userId = req.user.id; // Ensure req.user is correctly populated by your middleware

    console.log("userId and productId:", userId, productId); // Check the values

    try {
        // Validate productId
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            const itemIndex = cart.products.findIndex(p => p.product == productId);
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += 1; // Increment quantity if product exists
            } else {
                // Push a new product with the correct object structure
                cart.products.push({ product: productId, quantity: 1 });
            }
        } else {
            // Create a new cart if one does not exist
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity: 1 }] // Ensure this is correct
            });
        }

        await cart.save(); // Save the cart to the database
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
};



exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.products.findIndex(p => p.product == productId);
        if (itemIndex > -1) {
            cart.products.splice(itemIndex, 1);
        }

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ cartItems: cart.products });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

exports.deleteFromCart = async (req, res) => {

    const { productId } = req.params;
    const userId = req.user.id;
    console.log("userId and productId:", userId, productId);
    try {
        // Find the cart of the logged-in user and remove the product
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { products: { _id: productId } } }, 
            { new: true } 
        ).populate('products.product');
        console.log(updatedCart);
        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Product removed from cart', cart: updatedCart });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
    }
};
