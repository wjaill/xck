var connect_mongo = require("../connect_mongo")
//响应前台添加购物侧操作
const addGood = ({uid,goodid,num},res)=>{
    //找到当前用户的存储的文档
    num = parseFloat(num)
    connect_mongo((db)=>{
      let cars = db.collection("cars")
      cars.find({uid}).toArray((err,results)=>{
        if(err) throw err
        if(!results.length){//如果cars中无该用户文档
          //创建一个文档放入
          cars.insertOne({uid:uid,goods:[{goodid,num:num?num:1}]},(err,results)=>{
            if(err) throw err;
              res.send('1')
          })
        }else{//如果有这个用户的文档
          let ucar = results[0]    
          let isHas = false  
          ucar.goods=ucar.goods.map((item,i)=>{
              if(item.goodid==goodid){
                isHas = true
                item.num+=num?num:1
              }
              return item
          })
          if(!isHas){
            ucar.goods.push({goodid,num:num?num:1})
          }
          //更新用户的购物车数据
          cars.update({uid},{$set:{goods:ucar.goods}},(err,results)=>{
            if(err) throw err;
            console.log(results)
              res.send('1')
          })
        } 
      })
    })
}
module.exports = addGood



