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
      name: req.body.nameFromFront,
      firstname: req.body.firstnameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      name: newUserSave.name,
      firstname: newUserSave.firstname,
      id: newUserSave._id,
    }
  
    console.log(req.session.user)
  
    res.redirect('/')
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
      name: searchUser.name,
      firstname: searchUser.firstname,
      id: searchUser._id
    }
    res.redirect('/')
  } else {
    res.render('/')
  }

  
})

router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/')
})

module.exports = router;
