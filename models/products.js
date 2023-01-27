const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: { type: String },
    product_price: { type: String },
    product_rating: { type: String },
    product_img: {
        type: String
    },
    product_type:{type: String},
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const products = mongoose.model("products", productSchema);

module.exports = products;