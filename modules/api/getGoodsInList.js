var connect_mongo = require("../connect_mongo")
//处理前台请求商品的操作
const getGoodsInList = (params,res)=>{
    let {classid,order,keyword,pageSize,pageNum} = params//classid为类型 order为排序依据 keyword是关键字 pageSize每页数量，pageNum页数
    connect_mongo((db)=>{
      let goods = db.collection("goods")
      let rule = {}//控制classid
      let sort_rule={}//控制sort
      if(parseFloat(classid)){//为0查找所有  不加条件
        rule.classid=parseFloat(classid)
      }
      if(keyword){
        rule.keyword=new RegExp("" + keyword + "");
      }
      if(order){//order存在，按规则排序
        sort_rule[order]=-1
      }
      let limit = parseFloat(pageSize)
      goods.find(rule).sort(sort_rule).skip(pageSize*(pageNum-1)).limit(limit).toArray((err,results)=>{
        if(err) throw err;
        res.send(results)

        db.close()
      })
    })
}
module.exports = getGoodsInList



