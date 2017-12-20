
//库对象，响应对象，参数
const login = (db,res,params,req)=>{
    let users = db.collection('users')
    users.find({username:params.username,password:params.password}).toArray((err,results)=>{
        if(err) throw err;
        if(results.length){
        	console.log(req.session,'session')
        	console.log(req.session[params.username])
        	if(req.session[params.username]){
        		console.log('有这个用户',req.session)
        		res.send('1')
        	}else{
        		req.session[params.username] = 'has'
        		console.log('每有这个用户',req.session)
           		res.send({uid:results[0]._id,nickname:results[0].nickname})//express会处理为字符串
        	}	
        }else{
          res.send('0')
        }
        db.close()
    })
}

module.exports = login



