var connect_mongo = require("../connect_mongo")
//返回轮播图
const getBanner = (res)=>{
    connect_mongo((db)=>{
        db.collection('banner').find({}).toArray((err,banners)=>{//查找banner
            if(err) throw err;
            res.send(banners)
        })
        db.close()
    })
}
module.exports = getBanner



