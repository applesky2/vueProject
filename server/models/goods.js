const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productShema = new Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "checked":String,
    "productNum":Number,
    "productImage":String,
})

module.exports = mongoose.model("Good", productShema);