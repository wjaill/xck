var connect_mongo = require("../connect_mongo")
//处理前台请求商品的操作
const getGoods = (params,res)=>{
    let {classid} = params
    connect_mongo((db)=>{
      let goods = db.collection("goods")
      let ops = {classid:parseFloat(classid)}
      goods.find(classid===undefined?{}:ops).limit(classid===undefined?0:4).toArray((err,results)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
      })
    })
}
module.exports = getGoods



