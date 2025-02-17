const mongoose = require('mongoose');
const { type } = require('os');
const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
            }
        ],
        shippingAddress: {
            fullName: { type: String, require: true},
            address: { type: String, required: true },
            city: { type: String, required: true },
            phone: { type: Number, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true
        },
        itemsPrice: {
            type: Number,
            required: true
        },
        taxPrice: {
            type: Number,
            required: true
        },
        shippingPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: Boolean,
            default: false
        },
        deliveredAt: {
            type: Date
        },
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;