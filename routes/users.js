var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/connect_mongo')
var api_handler = require("../modules/api")
/* GET users listing. */
var ObjectID = require("mongodb").ObjectID

//  登陆路由 /users/login

router.get('/login', function(req, res, next) {
  //1.接收到前台get发送过来的数据
  let params = req.query
  //2. 连接mongodb数据库做判断
  connect_mongo((db)=>{
    api_handler.login(db,res,params,req)
  })
});


//注册 /users/register
router.post('/register', function(req, res, next) {
  //1.接收到前台post发送过来的数据
  let params = req.body
  //2. 连接mongodb数据库做判断
  connect_mongo((db)=>{
    api_handler.register(db,res,params)
  })
});

//注销登陆 如果有人要注销登陆的话，需要将此用户文档上的isOnline改成false，这样才能再次登陆
router.post('/exit', function(req, res, next) {
  //1.接收到前台post发送过来的数据
  let params = req.body
  //2. 连接mongodb数据库做判断
  connect_mongo((db)=>{
    
    db.collection("users").update({_id:ObjectID(params.uid)},{$set:{isOnline:false}},(err)=>{
      res.send('0')
    })
  })
});

module.exports = router;
