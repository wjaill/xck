var connect_mongo = require("../connect_mongo")
var ObjectID = require("mongodb").ObjectID
const removeBanner = ({_id},res)=>{
    connect_mongo((db)=>{
        db.collection('banner').remove({_id:ObjectID(_id)},(err,results)=>{
            if(!err) res.send('1')
        })
        db.close()
    })
}
module.exports = removeBanner



