var express = require('express');
var router = express.Router();
var journeyModel = require('../models/journey');
var userModel = require('../models/user');


// quelle utilité ?
var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]
////////////////////


/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Express' });
});




module.exports = router;
