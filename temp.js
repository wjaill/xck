

var async = require('async')

async.waterfall([
    function(next){
        var num = 1 
        console.log(num)//1
        next(null,num)
    },
    function(num,next){
        num++;
        console.log(num)//2
        next(null,num)
    },
    function(num,next){
        num++
        console.log(num)//3
        next(null,num)
    }
],function(err,num){
    console.log('ok:'+num)
})