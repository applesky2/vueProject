var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/imoocData');//链接数据库对应的集合
mongoose.connection.on('connected', function () { //监听连接
    console.log('connect success');
});
mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});
router.get('/', function (req, res, next) {
    Goods.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})
module.exports = router;