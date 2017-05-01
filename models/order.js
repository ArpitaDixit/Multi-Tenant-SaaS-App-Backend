//Dependencies
//var restful = require('node-restful');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drink = {
	qty: String,
	name: String,
	milk: String,
	size: String
}

//Schema
var orderSchema = Schema({
	id: {type: String, unique : true, index: true, required : true},
	location: String,
	items: drink ,
	status: String,
	message: String
});

var Order = mongoose.model('Order', orderSchema);

//Return router
module.exports = Order;
