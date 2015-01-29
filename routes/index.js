var express = require('express');
var router = express.Router();

 var models = require('../models/');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/wikistack');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));


/* GET home page. */
router.get('/', function(req, res, next) {
	var allDocs = models.Page.find();
	console.log('-------LINE--------');
	console.log(allDocs);

  res.render('index', { title: 'Express'});
});

// router.get('/add', function (req,res){
// 	res.render('addPage')
// })

module.exports = router;
