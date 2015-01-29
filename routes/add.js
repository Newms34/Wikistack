var express = require('express');
var router = express.Router();

/* GET users listing. */



router.get('/', function(req, res, next) {
  res.render('addPage');
});

router.post('/submit', function(req, res, next) {

	var title = req.body.pageTi;
	var cont = req.body.pageCo;
	var url_name = title.replace(/[^A-Za-z0-9\s]/g,'').replace(/\s/gi,'_');
	var tags = req.body.tags;
 var models = require('../models/');

  var p = new models.Page({ "title": title, "body":cont, "url_name":url_name, "tags": tags});
  p.save();
  res.redirect('/');
});
module.exports = router;
