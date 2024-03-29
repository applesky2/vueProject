var express = require('express');
var router = express.Router();
require('./../util/util');
var User = require('./../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        //req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      } else {
        res.json({
          status: "1",
          msg: '密码错误'
        });
      }
    }
  });
});

router.post('/logout', function (req, res, next) {
  res.cookie('userId', "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: "",
    result: ""
  })
});

router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: "",
      result: req.cookies.userName || ""
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

//购物车数据 res是  服务端写入,拿取是req
router.get('/cartList', function (req, res, next) {
  const userId = req.cookies.userId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ""
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: "",
          result: doc.cartList
        })
      }
    }
  })
})
//删除商品
router.post('/cartDel', function (req, res, next) {
  const userId = req.cookies.userId;
  const productId = req.body.productId;
  User.update({ userId: userId },
    {
      $pull: {
        'cartList': {
          'productId': productId
        }
      }
    }, function (err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
          result: ""
        })
      } else {
        res.json({
          status: '0',
          msg: "",
          result: 'success'
        })
      }
    });

})

//更新产品状态
router.post('/updateCart', function (req, res, next) {
  const userId = req.cookies.userId;
  const productId = req.body.productId;
  const productNum = req.body.productNum;
  const checked = req.body.checked;
  User.update({
    "userId": userId,
    'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked,
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ""
      })
    } else {
      res.json({
        status: '0',
        msg: "",
        result: "success"
      })
    }
  })
})

//获取地址列表
router.get('/addressList', function (req, res, next) {
  const userId = req.cookies.userId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '1',
          msg: "",
          result: doc.addressList
        })
      }
    }
  })
})

//设置默认地址
router.post('/setDefault', function (req, res, next) {
  const userId = req.cookies.userId;
  const addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    })
  } else {
    User.findOne({ userId: userId }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        const addressList = doc.addressList;
        addressList.forEach((item) => {
          if (item.addressId == addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        })
        doc.save(function (err1, doc1) {
          if (err1) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    })

  }
})
//删除地址
router.post('/deleteAdress', function (req, res, next) {
  const userId = req.cookies.userId;
  const addressId = req.body.addressId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      });
    }
  });
})
//订单支付
router.post('/payMent', function (req, res, next) {
  const userId = req.cookies.userId;
  const orderTotal = req.body.orderTotal;
  const addressId = req.body.addressId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let address = '';
      let goodList = [];
      doc.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item;
        }
      })
      doc.cartList.filter((item) => {
        if (item.checked === '1') {
          goodList.push(item);
        }
      })
      const platform = '622';
      const r1 = Math.floor(Math.random() * 10);
      const r2 = Math.floor(Math.random() * 10);
      const sysDate = new Date().Format('yyyyMMddhhmmss');
      const createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      const orderId = platform + r1 + sysDate + r2;
      const order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodList,
        orderStatus: '1',
        createDate: createDate
      }
      doc.orderList.push(order);
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
    }
  })
})
//订单详情
router.get("/orderDetail", function (req,res,next) {
  var userId = req.cookies.userId,orderId = req.param("orderId");
  User.findOne({userId:userId}, function (err,userInfo) {
      if(err){
          res.json({
             status:'1',
             msg:err.message,
             result:''
          });
      }else{
         var orderList = userInfo.orderList;
         if(orderList.length>0){
           var orderTotal = 0;
           orderList.forEach((item)=>{
              if(item.orderId == orderId){
                orderTotal = item.orderTotal;
              }
           });
           if(orderTotal>0){
             res.json({
               status:'0',
               msg:'',
               result:{
                 orderId:orderId,
                 orderTotal:orderTotal
               }
             })
           }else{
             res.json({
               status:'120002',
               msg:'无此订单',
               result:''
             });
           }
         }else{
           res.json({
             status:'120001',
             msg:'当前用户未创建订单',
             result:''
           });
         }
      }
  })
});
module.exports = router;
