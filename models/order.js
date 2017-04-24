//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

var drink = {
	qty: Number,
	name: String,
	milk: String,
	size: String
}

//Schema
var orderSchema = new mongoose.Schema({
	Id: {type: String, unique : true, index: true, required : true},
	Location: String,
	Drinks : drink,
	Status: String
});

//Return router
module.exports = restful.model('orders',orderSchema);
