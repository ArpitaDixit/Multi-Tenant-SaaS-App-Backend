//Dependencies
var express = require('express');
var router = express.Router();


//Models
var Item = require('../models/item')
//Routes

Item.methods(['get','put','post','delete']);
Item.register(router,'/items');


//Return router
module.exports = router;