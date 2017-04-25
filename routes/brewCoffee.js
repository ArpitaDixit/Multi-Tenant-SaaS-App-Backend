var async = require('async');
var Order = require('../models/order')

var brewing = 0;

function startbrewing() {
	console.log('startbrewing');
	async.waterfall([
	    function(callback){
	    	Order.find({}, 
	    			function(err, orders){
	    		if (err) console.log(err);
	    		setTimeout(function(){
	    	           callback(null, orders);
	    	    }, 3000);
	    	});
	    },
	    function(orders, callback){
	    	if( orders.length != 0) {
	    		console.log(orders.length);
	    		var Done = 0;
	    		var newStatus;
	    		for( i=0; i<orders.length; i++ ) {
	    			//console.log(i);
	    			if (orders[i].status === 'PAID' || orders[i].status === 'PREPARING' || orders[i].status === 'SERVED') {
	    				switch(orders[i].status) {
    						case "PAID":
       							 newStatus = {status:'PREPARING'};
        						 break;
    						case "PREPARING":
        						newStatus = {status:'SERVED'};
        						break;
    						case "SERVED":
        						newStatus = {status:'COLLECTED'};
        						break;
						}					
						Order.findOneAndUpdate({id:orders[i].id}, newStatus,function(err) {
							if (err) console.log(err);
							//else {console.log('Updated'); }
						});
						console.log(Done);
						Done = Done+1;
	    			}
	    		}
	    		if(Done === 0){
	    			console.log('if');
	    			brewing = 0;
	    		}
	    	} else {
	    		console.log('else');
	    		brewing = 0;
	    	}
	        setTimeout(function(){
	            callback(null);
	        }, 30000);
	    }
	],
	function(err) {
		if(brewing) {
			setTimeout(function(){
	            startbrewing();
	        }, 3000);
		} else {
			//console.log('Stopped brewing');
		}
	});
}

var brewCoffee = function(){
	if(!brewing) {
		brewing = 1;
		//console.log('Brewing Cofffees');
		startbrewing();
	}

};
module.exports = brewCoffee;