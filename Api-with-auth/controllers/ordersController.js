const Product = require('../models/productModel');
const Order = require("../models/orderModel");
const mongoose = require('mongoose');


const createOrder = async (req, res) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must contain at least one item" });
    }

    const deductedItems = [];

    try {
        const orderItems = [];
        let total = 0;

        for (const item of items) {
            const { productId, quantity } = item;

            if (!Number.isInteger(quantity) || quantity <= 0) {
                const error = new Error("Invalid order item");
                error.statusCode = 400;
                throw error;
            }

            const product = await Product.findOneAndUpdate(
                {
                    _id: productId,
                    stock: { $gte: quantity }
                },
                {$inc: { stock: -quantity }},
                { returnDocument: 'after' }
            );

            if (!product) {
                const exists = await Product.exists({ _id: productId });
                const error = new Error(exists ? `Not enough stock for ${productId}` : `Product ${productId} not found`);
                error.statusCode = exists ? 400 : 404;
                throw error;
            }

            deductedItems.push({ productId, quantity });

            orderItems.push({product: product._id, quantity, priceAtPurchase: product.price});

            total += product.price * quantity;
        }

        const newOrder = new Order({
            user: req.user.id,
            items: orderItems,
            total
        });

        await newOrder.save();

        return res.status(201).json(newOrder);

    } catch (error) {
        try {
            for (const item of deductedItems) {
                await Product.updateOne({ _id: item.productId },{ $inc: { stock: item.quantity } });
        }
        } catch (rollbackError) {
            throw rollbackError;
        }
        throw error;
    }
};



const getOrders = async (req, res) => {
    const filter = {};

    if (req.user.role !== 'admin') {
        filter.user = req.user.id;
    }

    const orders = await Order.find(filter);
    res.status(200).json(orders);
};


const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access forbidden" });
    }

    res.status(200).json(order);
};


const updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{ status },{ new: true, runValidators: true });

    if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
};


module.exports = {createOrder, getOrders, getOrderById, updateOrderStatus};