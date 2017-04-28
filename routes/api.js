//Dependencies
var express = require('express');
var router = express.Router();
var uuidV1 = require('uuid/v1');
var brewCoffee = require('../routes/brewCoffee');
var cors = require('cors')

//Models
var Order = require('../models/order')
function genRandomId() {
    return uuidV1();
}

//Routes

router.get('/',function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	res.send("Health check successful!");
});

router.all('*', function(req, res, next) {
	//res.addHeader()
    // add details of what is allowed in HTTP request headers to the response headers
    res.addHeader('Access-Control-Allow-Origin', '*');
    res.addHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.addHeader('Access-Control-Allow-Credentials', false);
    res.addHeader('Access-Control-Max-Age', '86400');
    res.addHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.addHeader('Access-Control-Allow-Headers', req.header.origin);
    // the next() function continues execution and will move onto the requested URL/URI
    next();
});

router.options('*', cors(), function(req, res) {
    res.sendStatus(200);
});


router.get('/order/:id', function(req, res) {
	var order_id = req.params.id;
	var order = Order.find({id:order_id}, function (err, post) {
			if(err) {
				var status = '{"status":"error","message":"Server Error, Try Again Later."}';
				res.json(JSON.parse(status));
			}
			else{
				if(post.length==0){
					console.log('here');
					var status = '{"status":"error","message":"Order not found."}';
					res.json(JSON.parse(status));
				}
				else{return res.json(post[0]);}
			}	   		
  });	
});

router.get('/orders', function(req, res) {
	var order = Order.find(function (err, post) {
			if(err) {
				console.log(err);
				var status = '{"status":"error","message":"Server Error, Try Again Later."}';
				res.json(JSON.parse(status));
			}
			else{
				 res.json(post);
			}
  });	
});

router.post('/order',function(req, res){
	var order_id = genRandomId();
	var ordered = Order({	
					id : order_id,
					location: req.body.location,
					items : {qty:req.body.items.qty, name:req.body.items.name, milk:req.body.items.milk, size:req.body.items.size}, 
					message : 'Order has been placed.',
					status : 'PLACED'
					});
	console.log(ordered);
	ordered.save(function(err){
		if(err) {
			console.log(err);
			var staus = '{"status":"error","message":"Server Error, Try Again Later."}';
			res.json(JSON.parse(status));
		}
		else{
			res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
			res.json(ordered);
		}
	});
});

router.delete('/order/:id', function(req, res) {
	var order_id = req.params.id;
	var order = Order.findOne({id:order_id}, function (err, post) {
			if(err) {
				var staus = '{"status":"error","message":"Invalid Order Id."}';
				res.json(JSON.parse(status));
			}
			else{
				console.log(post);
				console.log(post.status);
				if(post.length===0){
					var status = '{"status":"error","message":"No Order to Cancel."}';
					res.json(JSON.parse(status));
				}
				else if(post.status !=='PLACED'){
					var status = '{"status":"error","message":"Cannot cancel Order."}';
					res.json(JSON.parse(status));
				}
				else{
				 	Order.remove({id:order_id}, function (err, post) {
					 if(err) {
					var staus = '{"status":"error","message":"Error cancelling Order."}';
					res.json(JSON.parse(status));
					}
					else
					{				 
					var status = '{"status":"success","message":"Order successfully cancelled."}';
				 	res.json(JSON.parse(status));
				 	}
    				});
				}
    		}
 	});

}); 

router.put('/order/:id', function(req, res) {
	var order_id = req.params.id;
	var order = Order.findOne({id:order_id}, function (err, post) {
			if(err) {
				var staus = '{"status":"error","message":"Invalid Order Id."}';
				res.json(JSON.parse(status));
			}
			else{
					if(post ===null){
						var status = '{"status":"error","message":"Order not found."}';
						res.json(JSON.parse(status));
					}
					else if(post.status !=='PLACED'){
						var status = '{"status":"error","message":"Order update rejected."}';
						res.json(JSON.parse(status));
					}
					else{
						Order.findOneAndUpdate({id:order_id}, req.body, function (err, post) {
						if(err) {
							var staus = '{"status":"error","message":"Server Error, Try Again Later."}';
							res.json(JSON.parse(status));
						}
    					else{
    						var order = Order.findOne({id:order_id}, function (err, post) {
							if(err) {
								var staus = '{"status":"error","message":"Invalid Order Id."}';
								res.json(JSON.parse(status));
							}
							else{
								res.json(post);
							}
							});
    						}
    					});
				}
    		}
 });
});

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
//Order.methods(['get','put','post','delete']);
//Order.register(router,'/orders');


//Return router
module.exports = router;