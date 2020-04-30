var express = require('express');
var router = express.Router();
var journeyModel = require('../models/journey');
var userModel = require('../models/user');


// quelle utilité ?
var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]
////////////////////

// Variable de test
var notLogged = false;
var displayConfirmation = false;

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index');
});

/* GET Search. */
router.get('/search', async function(req, res, next) {
  // if(!req.session.user) {
  //   notLogged = true;
  //   res.redirect('/');
  // }
  res.render('search');
});

/* Search POST traitement avec date. */
router.post('/search-trajet', async function(req, res, next) {
  req.session.trajets = await journeyModel.findOne({departure:req.body.depart} && {arrival:req.body.arrivee} && {date:req.body.date});
  console.log(trajets);
  res.redirect('/result');
});

/* GET Results. */
router.get('/result', function(req, res, next) {
  //initialisation du tableau des tickets
  req.session.tickets = [];
  res.render('result', {trajets:req.session.trajets});
});

/* GET My Tickets Pages. */
router.get('/my-tickets', async function(req, res, next) {

  res.render('tickets', {tickets:req.session.tickets});
});

/* GET Confirm Tickets */
router.get('/confirm-tickets', async function(req, res, next) {
  displayConfirmation = true;
  await userModel.updateOne({_id:req.sessionuser.id}, {$push:{billets:req.session.tickets}});
  res.render('tickets', {displayConfirmation});
  displayConfirmation = false;
});

/* GET My Trips Pages. */
router.get('/my-trips', async function(req, res, next) {
  var user = await userModel.findById(req.session.user.id);
  var trips = user.billets;
  res.render('trips', {trips});
});


module.exports = router;
