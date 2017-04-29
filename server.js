//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var Order = require('./models/order')

//MongoDB
mongoose.connect('mongodb://localhost/starbucks');

//Express
var app = express();
port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(morgan('tiny'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


 //Routes
 app.use('/starbucks/store1',require('./routes/api'));
 app.use('/',require('./routes/api'));
// app.use('/starbucks/store1',require('./routes/pay'));

 
 //Start server
//app.listen(3000);
app.listen(port, function () {
  console.log('Server running at port: '+port);
});
//console.log('Listening on port 3000');