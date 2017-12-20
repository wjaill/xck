var connect_mongo = require("../connect_mongo")
const fs = require('fs')
const broadcast = require('../../bin/broadcast')
//添加图片
const addNewGood = ({newgood},res)=>{
  //将base64格式图片转换存储
    let {imgdata} = newgood
   var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");
   var dataBuffer = new Buffer(base64Data, 'base64');
   var reg = /\/(.+?);/g
   var ext = imgdata.match(reg)[0].replace('/','').replace(';','')
   var time = Date.now()
   fs.writeFile("./public/images/goods/news/good"+time+'.'+ext, dataBuffer, function(err) {
     if(err){
       console.log(err)
     }
     //添加到数据库
     delete newgood.imgdata
     newgood.imgurl = '/images/goods/news/good'+time+'.'+ext
     connect_mongo(function(db){
      db.collection("goods").insertOne(newgood,(err,results)=>{
        if(err) throw err;
        res.send(results.ops)
        broadcast.broad({type:'1',goodid:results.ops[0]._id})
      })
     })
   });
}
module.exports = addNewGood



