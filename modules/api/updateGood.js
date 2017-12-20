var connect_mongo = require("../connect_mongo")
const fs = require('fs')
let ObjectID = require('mongodb').ObjectID
//添加图片
const updateGood = ({nowgood},res)=>{
    let imgdata = nowgood.imgdata
    if(imgdata){
      var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      var reg = /\/(.+?);/g
      var ext = imgdata.match(reg)[0].replace('/','').replace(';','')
      var time = Date.now()
      fs.writeFile("./public/images/goods/news/good"+time+'.'+ext, dataBuffer, function(err) {
        if(err){
          console.log(err)
        }
        delete nowgood.imgdata
        nowgood.imgurl = "/images/goods/news/good"+time+'.'+ext
        //update
        update(nowgood,res)
      });
    }else{
        //update
        update(nowgood,res)
    }  
}

function update(nowgood,res){
  connect_mongo((db)=>{
    let _id = ObjectID(nowgood._id)
    delete nowgood._id
    db.collection("goods").update({_id},{$set:nowgood},(err)=>{
      if(err) throw err;
      nowgood._id = _id
      res.send(nowgood)
    })
  })
}
module.exports = updateGood



