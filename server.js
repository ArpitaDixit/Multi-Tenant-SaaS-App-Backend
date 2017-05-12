//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var Order = require('./models/order')
var cors = require('cors');

//MongoDB
mongoose.connect('mongodb://52.53.240.14/starbucks');

//Express
var app = express();
port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('tiny'));
app.use(cors());


 //Routes
 app.use('/starbucks/store1',require('./routes/api'));

// app.use('/starbucks/store1',require('./routes/pay'));

 
 //Start server
//app.listen(3000);
app.listen(port, function () {
  console.log('Server running at port: '+port);
});
//console.log('Listening on port 3000');