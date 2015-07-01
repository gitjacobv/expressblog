var express = require('express');
var router = express.Router();

//database connection
var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User' );

/* GET Signin page. */
router.get('/signin', function (req, res) {
  if(req.session.curr_user){
    res.redirect('/users/'+req.session.curr_user._id);
  } else{
      res.render('signin', {title: 'Signin'});
    }
});

/* POST Signin */
router.post('/signin', function(req, res) {

  if(req.body.username && req.body.password){

    User.findOne({
      username: req.body.username,
      password: req.body.password
    } , function ( err, user ){
      if(user){

        req.session.curr_user = user;
        req.flash('status', 'Successfully Logged In.');

        if(user.username == 'admin'){
          res.redirect('/admin');
        }

        else{
          res.redirect('/users/'+user._id);
        }

      }
      else{
        req.flash('status', 'Login Failed.');
        res.redirect('/signin');
      }

    });

  } else{
    req.flash('status', 'Incomplete credentials.');
    res.redirect('signin');
  }

});

/* GET Home page. */
router.get('/', function (req, res) {
  if(req.session.curr_user){
    res.redirect('/users/'+req.session.curr_user._id);
  } else {
    res.redirect('/signin');
  }
});


/*GET Logout Current User */
router.get('/logout', function (req, res) {

  if(req.session.curr_user){
    req.session.destroy();
  }

  res.redirect('/');

});

module.exports = router;
