//Dependencies
var express = require('express');
var router = express.Router();
var brewCoffee = require('../routes/brewCoffee');

//Models
var Order = require('../models/order')

//Routes

router.post('/order/:id/pay', function(req, res) {
	var order_id = req.params.id;
	var upadteOrder = { status : 'PAID',message:'Payment received!' };
		Order.findOne({id:order_id}, function (err, post) {
			if (err) {
				var status = '{"status":"error","message":"Order Payment Rejected."}';
				res.json(JSON.parse(status));
			}
			else{
				if(post.length===0){
					var status = '{"status":"error","message":"Order not found."}';
					res.json(JSON.parse(status));
				}
				{
					//console.log(post);
				if ( post.status==='PLACED') {
					//console.log('here');
					Order.update({id:order_id},upadteOrder, function (err) {
						if (err) console.log(err);
						else{

							Order.findOne({id:order_id}, function (err, post) {
							if (err) {
							var status = '{"status":"error","message":"Order Payment Rejected."}';
							res.json(JSON.parse(status));
							}
							else
							{
								res.json(post);
							brewCoffee();
							}
});							
						}
					});
				}
				else
				{
					var status = '{"status":"error","message":"Order Payment Rejected."}';
					res.json(JSON.parse(status));
				}
				}
				
			}		
  });	
});

//Return router
module.exports = router;