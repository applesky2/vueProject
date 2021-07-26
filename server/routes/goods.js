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
router.get('/list', function (req, res, next) {
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let sort = req.param('sort');
    let priceLevel = req.param('priceLevel');
    let skip = (page - 1) * pageSize;
    let params = {};
    if (priceLevel !== 'all') {
        switch(priceLevel){
            case '0': priceGt=0; priceLte=100;break;
            case '1': priceGt=100; priceLte=500;break;
            case '2': priceGt=500; priceLte=1000;break;
            case '3': priceGt=1000; priceLte=5000;break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte,
            }
        }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice': sort});
    goodsModel.exec(function(err, doc) {
    // Goods.find({}, function (err, doc) {
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

router.post("/addCart", function(req, res, next){
const userId = '100000077';
const productId = req.body.productId;
const User = require('../models/user');
User.findOne({userId:userId}, function(err, userDoc){
    if (err) {
        res.json({
            status:'1', //报错
            msg: err.message
        })
    } else {
        if (userDoc) {
            let goodsItem = '';
            userDoc.cartList.forEach((item) => {
                if(item.productId === productId){
                    goodsItem = item;
                    item.productNum ++;
                }
            });
            if (goodsItem) {
                userDoc.save(function(err2,doc2){
                    if (err2){
                        res.json({
                            status:'1',
                            msg: err2.message
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg: 'susscess'
                        })
                    }
                })
            } else{
                Goods.findOne({productId: productId}, function(err1, doc){
                    if (err1) {
                        res.json({
                            status:'1',
                            msg: err1.message
                        })
                    } else {
                        if (doc) {
                            doc.productNum = 1;
                            doc.checked = 1;
                            userDoc.cartList.push(doc); //商品信息加入用户里
                            userDoc.save(function(err2,doc2){
                                if (err2){
                                    res.json({
                                        status:'1',
                                        msg: err2.message
                                    })
                                }else{
                                    res.json({
                                        status:'0',
                                        msg: 'susscess'
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    }

})
})
module.exports = router;