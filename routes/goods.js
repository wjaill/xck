var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/connect_mongo')
var api_handler = require("../modules/api")
/* GET users listing. */


router.get('/getGoods', function(req, res, next) {
    let params = req.query
    api_handler.getGoods(params,res)
});

router.get('/getGoodsInList', function(req, res, next) {
    let params = req.query
    api_handler.getGoodsInList(params,res)
});

router.get('/addGood', function(req, res, next) {
    let params = req.query
    api_handler.addGood(params,res)
});

router.get('/reduceGood', function(req, res, next) {
    let params = req.query
    api_handler.reduceGood(params,res)
});

router.get('/removeGood', function(req, res, next) {
    let params = req.query
    api_handler.removeGood(params,res)
});


module.exports = router;
