var express = require('express');
var router = express.Router();
var filters = require('../filters');
var models = require('../models/');
/* GET home page. */
router.get('/', function(req, res, next) {
	models.Page.find(function(err, pages){
		
		res.render('index', { title: 'Express', docs: pages});
	});
});

router.get('/wiki/:page', function(req, res, next){
	var page = req.params.page;

	var test = models.Page.where({url_name: page});
	test.findOne(function(err, pages){

 		console.log(pages);
		res.render('show', {title: page, page: pages, tags: pages.tags.split(',')});
	})
	
}) 

module.exports = router;
