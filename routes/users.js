var express = require('express');
var router = express.Router();

//database connection
var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User' );

/*GET Create User Page */
router.get('/create', function ( req, res ){
  res.render('users/create', { title: 'Create User' } );
  return;
});

/*POST Create User */
router.post('/create', function ( req, res ){

  //check if a field is empty
  for(entry in req.body){
    if(req.body[entry] == ''){
      req.flash('status', 'Fields must not be empty');
      res.redirect('/users/create');
      return;
    }
  }

  //check if matching password
  if(req.body.password != req.body.confirm_password){
    req.flash('status', 'Password does not match.');
    res.redirect('/users/create');
    return;
  }

  //check if username is already existing
  User.findOne( {username: req.body.username}, function ( err, finduser ){
    if(finduser){
      req.flash('status', 'User already exist.');
      res.redirect('/users/create');
    } else{
      new User({
        username     : req.body.username,
        password     : req.body.password,
        firstname    : req.body.firstname,
        middlename   : req.body.middlename,
        lastname     : req.body.lastname,
        about        : req.body.about,
        //birthday     : req.body.birthday,
        updated_at : Date.now()
      }).save( function( err, user, count ){
          req.flash('status', 'Successfully Created User.');

          if(req.session.curr_user && req.session.curr_user.username == 'admin'){
            res.redirect('/admin/users');
          } else{
            res.redirect('/');
          }

        });
    }
  });


});

/* GET Home page with id */
router.get('/:uid', function (req, res) {
  if(req.session.curr_user){

    if(req.session.curr_user.username == "admin"){
      res.redirect('/admin');
      return;
    }

    if(req.session.curr_user._id == req.params.uid){

      User.findById( req.params.uid, function ( err, user ){
        res.render( 'users/home', {title: 'Home Page', user: user});
      });
      return;
    }
  }
  else {
    res.send('Account is private.');
  }

});

/*GET Edit User*/
router.get('/:uid/edit', function ( req, res ){
  User.findById( req.params.uid, function ( err, user ){
    res.render( 'users/edit', {
    title: 'Edit User',
    user: user
    });
  });
});

/*POST Update User */
router.post('/:uid/edit', function ( req, res ){

  //check if a field is empty
  for(entry in req.body){
    if(req.body[entry] == ''){
      req.flash('status', 'Fields must not be empty');
      res.redirect('/users/'+req.params.uid+'/edit');
      return;
    }
  }

  //check if matching password
  if(req.body.password != req.body.confirm_password){
    req.flash('status', 'Password does not match.');
    res.redirect('/users/'+req.params.uid+'/edit');
    return;
  }

  User.findById( req.params.uid, function ( err, user ){
    user.password     = req.body.password,
    user.firstname    = req.body.firstname,
    user.middlename   = req.body.middlename,
    user.lastname     = req.body.lastname,
    user.about        = req.body.about,
    updated_at        = Date.now()
    user.save( function ( err, user, count ){
      req.flash('status','Succesfully updated profile.')
      res.redirect( '/users/'+req.params.uid );
    });
  });

});

/*GET Delete User*/
router.get('/:uid/delete', function ( req, res ){
  User.findById( req.params.uid, function ( err, user ){
    user.remove( function ( err, user ){
      req.flash('status', 'User successfully deleted.')
      res.redirect( '/users' );
    });
  });
});


module.exports = router;
