var express = require('express');
var router = express.Router();

var models = require('../models/');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/wikistack');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));


/* GET home page. */
router.get('/', function(req, res, next) {
	models.Page.find(function(err, pages){
		
		res.render('index', { title: 'Express', docs: pages});
	});


 
});

// router.get('/add', function (req,res){
// 	res.render('addPage')
// })

module.exports = router;
