const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Product = require('../models/productSchema');
const Order = require('../models/orderSchema');
const Payment = require('../models/paymentSchema');
const { authenticateToken } = require('../middlewares/auth');
require('dotenv').config();
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', authenticateToken, async (req, res) => {
    try {
        const { amount, currency, products } = req.body;
        console.log("req.body:", req.body);
        const options = {
            amount: amount * 100, 
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        let parsedProducts;
        if (typeof products === 'string') {
            parsedProducts = JSON.parse(products);
        } else {
            parsedProducts = products;
        } 
        console.log("parsedProducts:", parsedProducts);

        for (let product of parsedProducts) {
            const productData = await Product.findById(product.productId);
            if(productData.isDeleted) {
                console.log(`${productData.title} is deleted`);
                return res.status(404).json({ success: false, message: `${productData.title} out of Stock` });
            }
        }

        const order = await razorpay.orders.create(options);
        console.log("order:", order);
        if (!order) {
            return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
        }

        const formattedProducts = parsedProducts.map(product => ({
            quantity: product.quantity,
            product: product.productId 
        }));

        const newOrder = new Order({
            user: req.user.id,
            products: formattedProducts,
            totalAmount: amount,
            paymentStatus: 'pending',
            orderId: order.id
        });
       
        await newOrder.save();

        res.status(201).json({ success: true, orderId: newOrder._id, order }); 
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, message: 'Error creating order' });
    }
});

router.post('/verify-payment', async (req, res) => { 
    try {
        const { order_id, payment_id, signature } = req.body; 

        const order = await Order.findById(order_id);
        console.log("order while verifying payment:", order);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const newPayment = new Payment({
            user: order.user,
            order: order._id,
            paymentId: payment_id,
            orderId: order.orderId,
            signature,
            amount: order.totalAmount
        });

        await newPayment.save();

        order.paymentStatus = 'paid';
        order.orderStatus = 'processing';
        await order.save();


        res.status(200).json({ success: true, message: 'Payment verified successfully', payment: newPayment });
        

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Error verifying payment' });
    }
});

module.exports = router;