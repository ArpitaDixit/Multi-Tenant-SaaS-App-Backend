//Dependencies
var express = require('express');
var router = express.Router();
var uuidV1 = require('uuid/v1');

//Models
var Order = require('../models/order')

function genRandomId() {
    return uuidV1();
}

//Routes
router.get('/order/:id', function(req, res) {
	var order_id = req.params.id;
	var order = Order.find({Id:order_id}, function (err, post) {
			if(err) console.log(err);
			//console.log(req.body);
    		return res.json(post);
  });	
});

router.get('/orders', function(req, res) {
	var order = Order.find(req.params.id, function (err, post) {
			if (err) return next(err);
			//console.log(req.body);
    		return res.json(post);
  });	
});

router.post('/order',function(req, res){
	var randId = genRandomId();
	var ordered = Order({	
					Id : randId,
					Location: req.body.Location,
					Drinks : {qty:req.body.Drinks.qty, name:req.body.Drinks.name, milk:req.body.Drinks.milk, size:req.body.Drinks.size}, 
					Status : 'PLACED'
					});
	console.log(ordered);
	ordered.save(function(err){
		if(err) console.log(err);
		else{
			res.json(ordered);
		}
	});
});

router.delete('/order/:id', function(req, res) {
	var order_id = req.params.id;
	Order.remove({Id:order_id}, function (err, post) {
			if(err) console.log(err);
			//console.log(req.body);
    		else{
    					console.log('Delete Success');
    					res.json(post);
    				}
    			});
    		//}
 // });	
}); 

router.put('/order/:id', function(req, res) {
	var order_id = req.params.id;
	Order.findOneAndUpdate({Id:order_id}, req.body, function (err, post) {
			if(err) console.log(err);
			//console.log(req.body);
    		else{
    			/*order.delete(function(err)
    			{
    				if(err) console.log(err);
    				else{*/
    					console.log('Update Success');
    					res.json(post);
    				}
    			});
    		//}
 // });	
});
//Order.methods(['get','put','post','delete']);
//Order.register(router,'/orders');


//Return router
module.exports = router;