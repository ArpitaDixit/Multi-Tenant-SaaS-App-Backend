//Dependencies
var express = require('express');
var router = express.Router();
var brewCoffee = require('../routes/brewCoffee');

//Models
var Order = require('../models/order')

//Routes
router.post('/:id/pay', function(req, res) {
	var order_id = req.params.id;
	var upadteOrder = { Status : 'PAID' };
		Order.findOne({Id:order_id}, function (err, post) {
			if (err) console.log(err);
			else{
				console.log(post);
				if ( post.Status==='PLACED') {
					Order.update({Id:order_id},upadteOrder, function (err) {
						if (err) console.log(err);
						else{
							res.json('Payment Success');
							brewCoffee();
						}
					});
				}
			}		
  });	
});

//Return router
module.exports = router;