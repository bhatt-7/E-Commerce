const express = require('express');
const Cart = require('../models/cartSchema');
const Product = require('../models/productSchema');
const User = require('../models/userSchema');

exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    console.log("userId and productId:", userId, productId);

    try {
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            const itemIndex = cart.products.findIndex(p => p.product == productId);
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
        } else {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity: 1 }]
            });
        }

        await cart.save();
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
        console.log("into cart");
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

exports.formatCart = async (req, res) => {
    const userId = req.user.id;
    const products = req.body.productsInCart;

    console.log("userId and products:", userId, products);

    try {
        const deletedCart = await Cart.findOneAndDelete({ user: userId });
        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }


        await Promise.all(
            products.map(async (product) => {
                const updatedProduct = await Product.findOneAndUpdate(
                    { _id: product.productId },
                    { $inc: { quantity: -product.quantity } },
                    { new: true }
                );
                return updatedProduct;
            })
        );

        res.status(200).json({ message: 'Cart deleted and inventory updated successfully' });
    } catch (error) {
        console.error('Error deleting cart or updating inventory:', error);
        res.status(500).json({ message: 'Failed to delete cart or update inventory', error: error.message });
    }
};

exports.handleQuantity = async (req, res) => {
    const productId = req.params.productId;
    const { quantity } = req.body;
    const userId = req.user.id;

    console.log("userId:", userId);
    console.log("productId:", productId);
    console.log("Quantity:", quantity);

    if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });
        console.log("Existing Cart:", cart);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        console.log("Existing Cart products:", cart.products);
        const productInCart = cart.products.find(p => p._id.toString() === productId);
        console.log("Product in Cart:", productInCart);

        if (!productInCart) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        productInCart.quantity = quantity;

        await cart.save();


        // const cart = await Cart.findOneAndUpdate(
        //     { user: userId, 'products.product': productId },
        //     { $set: { 'products.$.quantity': quantity } },
        //     { new: true }
        // );

        console.log("Cart:", cart);

        if (!cart) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item quantity updated successfully' }, cart);
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ message: 'Failed to update cart item quantity', error: error.message });
    }
};
