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
		var tagList = pages.tags;
			models.Page.findAllTags(tagList,function(err,tagsPages){
				var posNotToRemove;
					for(var i=0;i<tagsPages.length;i++){
						if (tagsPages[i].title === pages.title){
							posNotToRemove = i;
						}
					}
					tagsPages.splice(posNotToRemove,1);
					res.render('show', {title: page, page: pages, tags: pages.tags, similar:tagsPages});
			});
	});
	
}); 

router.get('/wiki/tag/:tag', function(req, res, next){
    var webTag = req.params.tag;

    // var test = models.Page.where({tag: {$in: tag}});
    // test.find(function(err, pages){
    models.Page.findByTags(webTag, function (err,pages){
        if (pages.length==0){
            res.render('addPage', {action: "Tag is not defined, "});
        }
        else{
        res.render('tags', {title: webTag, pages: pages});
        }
    });
   //res.render('show', {title: tag, page: pages, tags: pages.tags.split(',')});
});

router.get('/wiki/:page/edit', function(req, res, next) {
	var pageName = req.params.page;
 	var models = require('../models/');
 	var test = models.Page.where({url_name:pageName});
 	test.findOne(function(err, pages){
		res.render('editPage', {pages:pages});
	});
});

router.post('/edit/submit', function(req,res,next){
	var title = req.body.pageTi;
	var cont = req.body.pageCo;
	var tags = req.body.tags;
	var url_name = title.replace(/[^A-Za-z0-9\s]/g,'').replace(/\s/gi,'_');
	var currPageId = req.body.pageId;
 	var models = require('../models/');
 	var pageToEdit = models.Page.where({_id: currPageId});
 	pageToEdit.findOne(function(err,pages){
 		pages.body = cont;
 		pages.tags = tags.split(',').trim();
 		pages.save(function(err, updatedPage, numModified) {
 			console.log("udated page", updatedPage);
 			console.log("num modified", numModified);
 			res.redirect('/wiki/'+title);	
 		});
 		
 	});
});
 	// var updatedPage = req.body.updatedPage; // this thing has { _id: '123', name: 'Test'}

 	// delete updatedPage._id; // { name: 'Test'}


 	// pageToEdit.findOneAndUpdate({ _id: req.body._id}, updatedPage);


module.exports = router;
