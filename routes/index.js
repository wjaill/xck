var express = require('express');
var router = express.Router();
var connect_mongo = require("../modules/connect_mongo")
var async = require('async')
var ObjectID = require('mongodb').ObjectID;
/* GET home page. */
//当 index路由模块get到url为 
router.get('/', function(req, res, next) {
  //可以给前端返回一个ejs模板编译后的html，第一个参数为要响应的模板的名字，后面对象是渲染模板时使用的数据
  let results = {}
  
  //获取到轮播图数据后渲染index.ejs模板
  async.waterfall([
    function(next){//连接数据库
      connect_mongo((db)=>{
        next(null,db)
      })
    },
    function(db,next){//获取轮播图信息
      db.collection('banner').find({}).toArray((err,banners)=>{//查找banner
        if(err) throw err;
        results.banners = banners
        next(null,db)
      })
    },
    function(db,next){//获取分类
      db.collection('class').find({}).toArray((err,classes)=>{//查找商品分类
        if(err) throw err;
        results.classes = classes
        next(null,db)
      })
    },
    function(db,next){//获取商品
      db.collection('goods').find({classid:1}).limit(4).toArray((err,goods)=>{//查找对应的商品
        if(err) throw err;
        results.goods = goods
        next(null)
      })
      
    }
  ],function(){
    //渲染
    res.render('index',results)
  })





});

//进入登陆界面，渲染login.ejs
router.get('/login', function(req, res, next) {
  res.render('login', {  });
});


//进入注册界面，渲染register.ejs
router.get('/register',(req,res,next)=>{
    res.render('register',{  })
})


//进入列表界面，渲染list.ejs
router.get('/list',(req,res,next)=>{
  let results = {}
  async.waterfall([
    function(next){//连接数据库
      connect_mongo((db)=>{
        next(null,db)
      })
    },
    function(db,next){//获取商品的第一页的数据（每页三个）
      db.collection("goods").find({}).limit(3).toArray((err,goods)=>{
        if(err) throw err;
        results.goods = goods
        next(null,db)
      })    
    },
    function(db,next){//获取分类
      db.collection('class').find({}).toArray((err,classes)=>{//查找商品分类
        if(err) throw err;
        results.classes = classes
        next(null,results)
      })
    }
  ],function(err,results){
    res.render('list',results)//渲染
  })
  
})


//进入详情界面，渲染detail.ejs
router.get('/detail', function(req, res, next) {
  let _id = req.query.id
  console.log(_id,111)
  connect_mongo((db)=>{
    db.collection("goods").find({_id:ObjectID(_id)}).toArray((err,results)=>{
      if(err) throw err;
      res.render('detail', { good:results[0] });
    })
    db.close()
  })
  
});


//进入购物车界面，渲染car.ejs
router.get('/car', function(req, res, next) {
  //应该把这个用户的购物车里的数据捣鼓出来给渲染到ejs模板里
  //express对cookie进行处理，获取的时候直接req.cookies就可以获取
  let user_info = req.cookies.user_info?JSON.parse(req.cookies.user_info):''
  if(!user_info){//如果没有登陆
    res.render('car',{results:'not login'})
    return ;
  }
  connect_mongo((db)=>{

    let cars = db.collection("cars")
    cars.find({uid:user_info.uid}).toArray((err,results)=>{
      if(err) throw err;
      if(!results.length||!results[0].goods.length){//如果没有对应的集合，代表没有买过东西
        res.render('car',{results:'not buy'})
      }else{
        //根据购物车数据里的商品id来取出商品集合里对应的商品的详细信息，一并返回（imgurl，name，price）
        
        let goods = results[0].goods
        
        //1. 先把商品集合里所有的商品都取出来，然后找到合适的用 2.根据goods里面的goodid，一个一个的查找
       console.time('temp')
        let goodscoll = db.collection("goods")//商品的集合
        let [allnum,allprice]=[0,0]//总价和总数，准备渲染到ejs里
        goodscoll.find({}).toArray((err,results)=>{
            if(err) throw err;       
            goods=goods.map((item)=>{
              allnum+=item.num
              for(var i = 0;i<results.length;i++){
                if(results[i]._id==item.goodid){
                  item.imgurl = results[i].imgurl
                  item.name = results[i].name
                  item.price = results[i].price
                  allprice+=item.num*item.price
                  break;
                }
              }
              return item              
            })
            goods.allnum=allnum;
            goods.allprice=allprice
            res.render('car',{results:goods})
            console.timeEnd('temp')
        })
      }
      db.close()
    })
  })
});
module.exports = router;
