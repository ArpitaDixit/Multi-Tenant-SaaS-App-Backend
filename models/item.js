//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;


//Schema

var itemShema = new mongoose.Schema({
	Name: String,
	Milk: String,
	Size: String,
	Quantity: Number

})

//Return router
module.exports = restful.model('items',itemShema);