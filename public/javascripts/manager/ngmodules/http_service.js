

var abc = angular.module("service",[]).factory("_http",function ($http) {
            
             return function(options){
                 
                 let method = options.dataType=='jsonp'?'jsonp':(options.type||'get')
                 console.log(options.type)
                 let _options = {
                     url:options.url,
                     method:method,
                     params:options.data||{}
                 }
                 if(method=='jsonp'){
                     _options.params[options.jsonp||'callback']='JSON_CALLBACK'
                 }
                 if(method=='post'){
                    _options.params = {}
                    _options.data = options.data||{}
                 }
                 $http(_options).success(options.success).error(options.error||function(err){console.log(err)})
             }
         })