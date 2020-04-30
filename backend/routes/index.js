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
  // creation de la variable de session des trajets
  req.session.trajets = await journeyModel.findOne({departure:req.body.depart} && {arrival:req.body.arrivee} && {date:req.body.date});
  console.log(trajets);
  res.redirect('/result');
});

/* GET Results. */
router.get('/result', function(req, res, next) {
  //initialisation de la variable tableau des tickets qui stocke les trajets validés par le user
  req.session.tickets = [];
  res.render('result', {trajets:req.session.trajets});
});

/* GET My Tickets Pages. */
router.get('/my-tickets', async function(req, res, next) {

  res.render('tickets', {tickets:req.session.tickets});
});

/* GET Confirm Tickets */
router.get('/confirm-tickets', async function(req, res, next) {
  displayConfirmation = true; // variable pour préparer l'affichage de la popup

  //à la confirmation ajouter les infos des billettes achetés dans le sous-doc du Uuser
  await userModel.updateOne({_id:req.sessionuser.id}, {$push:{billets:req.session.tickets}});

  //render
  res.render('tickets', {displayConfirmation});
  // changement de la variable d'affichage pour éviter qu'elle ne s'affiche à chaque fois
  displayConfirmation = false;
});

/* GET My Trips Pages. */
router.get('/my-trips', async function(req, res, next) {
  var user = await userModel.findById(req.session.user.id);
  var trips = user.billets;
  res.render('trips', {trips});
});


module.exports = router;
