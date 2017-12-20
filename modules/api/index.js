var login = require('./login')
var register = require('./register')
var getGoods = require('./getGoods')
var getGoodsInList = require('./getGoodsInList')
var addGood = require('./addGood')
var reduceGood = require('./reduceGood')
var removeGood = require('./removeGood')
var getBanner = require('./getBanner')
var removeBanner = require('./removeBanner')
var addBanner = require('./addBanner')
var addNewGood = require('./addNewGood')
var updateGood = require('./updateGood')
const api_handler = {
    updateGood,login,register,getGoods,getGoodsInList,addGood,reduceGood,removeGood,getBanner,removeBanner,addBanner,addNewGood
}
module.exports = api_handler