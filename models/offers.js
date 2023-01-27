const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    product_id:{ type: String },
    offer_name: { type: String },
    offer_before_price: { type: String },
    offer_percentage: { type: String },
    offer_after_price: {
        type: String
    },
    offer_img: {
        type: String
    },
    offer_start_date: {
        type: String
    },
    offer_end_date: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const products = mongoose.model("offers", offerSchema);

module.exports = products;