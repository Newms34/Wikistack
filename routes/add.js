var express = require('express');
var router = express.Router();

/* GET users listing. */



router.get('/', function(req, res, next) {
  res.render('addPage');
});

router.post('/submit', function(req, res, next) {
	// if (req.body.pageTi){
		var title = req.body.pageTi;
	// }
	// else{
	// 	var title = Math.random().toString(36).substring(2,7); 
	// }
	var cont = req.body.pageCo;
	var url_name = title.replace(/[^A-Za-z0-9\s]/g,'').replace(/\s/gi,'_');
 //  res.send('respond with a resource');
 var models = require('../models/');
 //SOME COMMENTS GO HERE
  var p = new models.Page({ "title": title, "body":cont, "url_name":url_name });
  p.save();
  res.redirect('/');
});
module.exports = router;
