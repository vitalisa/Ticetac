var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST formulaire Sign-up */

router.post('/sign-up', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      nom: req.body.nomFromFront,
      prenom: req.body.prenomFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      nom: newUserSave.nom,
      prenom: newUserSave.prenom,
      id: newUserSave._id,
    }
  
    console.log(req.session.user)
  
    res.redirect('/search')
  } else {
    res.redirect('/')
  }
  
})

/* POST formulaire Sign-in */

router.post('/sign-in', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })

  if(searchUser!= null){
    req.session.user = {
      nom: searchUser.nom,
      prenom: searchUser.prenom,
      id: searchUser._id
    }
    res.redirect('/search')
  } else {
    res.render('/')
  }

  
})

/* GET Logout */

router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/')
})

module.exports = router;
