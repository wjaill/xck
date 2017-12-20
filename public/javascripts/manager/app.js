

var app = angular.module("app",['ui.router','service'])

app.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('','/main')
    // $urlRouterProvider.otherwise('/A')
    $stateProvider.state('main', {
        url:'/main',
        templateUrl: '../../template/main.html'
    }).state('banner', {
        url:'/banner',
        templateUrl: '../../template/banner.html',
        controller:"bannerController"
    }).state('goods', {
        url:'/goods',
        templateUrl: '../../template/goods.html',
        controller:"goodsController"
    })
}])