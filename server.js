//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Order = require('./models/order')

//MongoDB
mongoose.connect('mongodb://54.215.245.232/starbucks');

//Express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
 //Routes
 app.use('/starbucks/store1',require('./routes/api'));
 app.use('/starbucks/store1',require('./routes/pay'));

 
 //Start server
//app.listen(3000);
console.log('Listening on port 3000');