//Dependencies
var express = require('express');
var router = express.Router();
var brewCoffee = require('../routes/brewCoffee');

//Models
var Order = require('../models/order')

//Routes
/*router.all('*', function(req, res, next) {
    // add details of what is allowed in HTTP request headers to the response headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    // the next() function continues execution and will move onto the requested URL/URI
    next();
});

router.options('*', function(req, res) {
    res.sendStatus(200);
});*/

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