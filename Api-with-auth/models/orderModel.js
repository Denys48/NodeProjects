const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number},
            priceAtPurchase: {type: Number}
        }
    ],
    total: {type: Number},
    status: {type: String, enum: ['pending', 'paid', 'shipped', 'cancelled'], default: "pending"}
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);