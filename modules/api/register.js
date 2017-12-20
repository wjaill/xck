
//库对象，响应对象，参数
const register = (db,res,params)=>{
   let users = db.collection('users')
   users.find({username:params.username}).toArray((err,results)=>{
     console.log('hahaha')
     if(err) throw err;
     if(results.length){
       //用户存在
       res.send('0')
       db.close()
     }else{
        users.insertOne(params,(err,result)=>{
          if(result.insertedCount==1){
            res.send('1')
          }else{res.send('0')}
          db.close()
        })
     }
   })
}
module.exports = register