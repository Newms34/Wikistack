var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


/* GET home page. */
router.get('/', function(req, res, next) {
	var allDocs = db.wikistack.find();
	console.log(allDocs);

  res.render('index', { title: 'Express'});
});

// router.get('/add', function (req,res){
// 	res.render('addPage')
// })

module.exports = router;