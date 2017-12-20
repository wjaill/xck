
//连接数据库，回调接收库对象
const connect_mongo = (callback)=>{
    var MongoClient = require('mongodb').MongoClient;
    
    var url = 'mongodb://localhost:27017/latiao';
    MongoClient.connect(url, function(err, db) {//db是库对象
        callback(db)
    });
}
//把接口暴露出去
module.exports = connect_mongo
