const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
