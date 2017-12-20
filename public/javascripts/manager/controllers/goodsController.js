
app.service("data",function () {
    
})

app.controller("goodsController",function($scope,_http,$rootScope,data){
    $scope.isUpdateShow = {flag:false}
    $scope.newgood = {}
    $scope.classes = []
    $scope.newgood.classid = 1
    
    _http({
        url:"/goods/getGoods",
        success:function(results){
            console.log(results)
            $scope.goods = results
        }
    })

    _http({
        url:"/manager/getClasses",
        success:function(results){
            console.log(results)
            $scope.classes = results
            data.classes = results
        }
    })

    $scope.addClasses=function(){
        _http({
            url:"/manager/addClasses",
            data:{newclass:$scope.newclass,classid:$scope.classes.length+1},
            success:function(results){
                
                if(results){
                    $scope.classes.push(results[0])
                }
            }
        })
    }

    $scope.removeGood = function (_id,index) {
        _http({
            url:"/manager/removeGood",
            data:{_id:_id},
            success:function(results){
                if(results == 1){
                    alert('删除成功')
                    $scope.goods.splice(index,1)
                }              
            }
        })
    }

    $scope.addGood = function () {
        var inp = document.getElementsByClassName('uploadinp_add')[0]
        var img = inp.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(img)//转换为base64
        reader.onload = function (e) {
            $scope.newgood.imgdata = this.result
            
            _http({
                url:'/manager/addNewGood',
                type:'post',
                data:{
                    newgood:$scope.newgood
                },success:function(results){
                    if(results){
                        alert('添加成功')
                        $scope.goods.push(results[0])
                        $scope.isModalShow = false
                    }
                }
            })
        }
    }

    $scope.updateShow = function (_id) {//显示编辑modal
        $scope.isUpdateShow.flag = true
        //获取此商品的信息，在updateController里面用
        _http({
            url:'/manager/getGoodById',
            data:{_id:_id},
            success:function (good) {
                console.log(good)
                $rootScope.nowgood = good
            }
        })
    }

})



app.controller("updateController",function ($scope,_http,data,$rootScope) {

    $scope.data = data

    $scope.addClasses=function(){
        _http({
            url:"/manager/addClasses",
            data:{newclass:$scope.newclass,classid:$scope.data.classes.length+1},
            success:function(results){              
                if(results){
                    $scope.data.classes.push(results[0])
                }
            }
        })
    }


    $scope.update = function () {
        console.log($rootScope.nowgood)
        var inp = document.getElementsByClassName('uploadinp_update')[0]
        if(inp.files.length){
            var img = inp.files[0]
            var reader = new FileReader()
            reader.readAsDataURL(img)//转换为base64
            reader.onload = function (e) {
                $rootScope.nowgood.imgdata = this.result
                updateGood($rootScope)
            }
        }else{
            updateGood($rootScope)
        }        
    }

    function updateGood($rootScope) {
        _http({
            url:'/manager/updateGood',
            type:'post',
            data:{
                nowgood:$rootScope.nowgood
            },success:function(results){
                console.log(results)
                if(results){
                    alert('更改成功')
                    //更改页面中的此商品
                    for(var i=0;i<$scope.goods.length;i++){
                        if($scope.goods[i]._id==results._id){
                            $scope.goods[i]=results
                            break;
                        }
                    }
                    $scope.isUpdateShow.flag = false
                }
            }
        })
    }

})