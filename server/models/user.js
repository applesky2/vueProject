var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList": [
        {
            "productId": String,
            "productName": String,
            "salePrice": String,
            "productImage": String,
            "checked": String,
            "productNum": String,
        }
    ],
    "addressList": [
        {
            addressId: String,
            isDefault: Boolean,
            postCode: String,
            streetName: String,
            tel: String,
            userName: String,  
        }
    ]
})

module.exports = mongoose.model('user', userSchema);