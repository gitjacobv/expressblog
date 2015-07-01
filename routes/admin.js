var express = require('express');
var router = express.Router();

//database connection
var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User' );
var Post     = mongoose.model( 'Post' );

/* GET Homepage of admin */
router.get('/', function ( req, res ){
  res.render( 'admin/home' , {title: 'Home Page'});
});

/* GET Userlist */
router.get('/users', function ( req, res ){
  User.find( function ( err, users, count ){
    res.render( 'admin/userlist', {
      title : 'User List',
      users : users
    });
  });
});

/* GET Home page with id */
router.get('/users/:uid', function (req, res) {

  if(req.session.curr_user && req.session.curr_user.username = "admin"){
    User.findOne({_id: req.params.uid }, function ( err, user ){
      if(user){
        res.render('admin/view_user', {title: 'View User', user: user});
      }
      else{
        req.flash('status', 'No such user.');
        res.redirect('/admin/users');
      }
    });
  } else{
    res.redirect('/');
  }

});

/*GET Edit User with uid*/
router.get('/users/:uid/edit', function ( req, res ){
  User.findById( req.params.uid, function ( err, user ){
    res.render( 'admin/edit_user', {
    title: 'Edit Profile',
    user: user
    });
  });
});

/*POST Edit User with uid */
router.post('/users/:uid/edit', function ( req, res ){

  if( req.body.new_password == req.body.confirm_new_password ){

    User.findById( req.params.uid, function ( err, user ){
      user.password     = req.body.new_password,
      user.firstname    = req.body.new_firstname,
      user.middlename   = req.body.new_middlename,
      user.lastname     = req.body.new_lastname,
      user.about        = req.body.new_about,
      updated_at        = Date.now()
      user.save( function ( err, user, count ){
        req.flash('status','Succesfully edited user.')
        res.redirect( '/admin/users' );
      });
    });

  } else {
    req.flash('status', 'Password does not match.');
    res.redirect('/admin/users/'+req.params.uid+'/edit');
  }

});

/*GET Delete User*/
router.get('/users/:uid/delete', function ( req, res ){
  User.findById( req.params.uid, function ( err, user ){
    user.remove( function ( err, user ){
      req.flash('status', 'User successfully deleted.')
      res.redirect( '/admin/users' );
    });
  });
});


/* GET Posts */
router.get('/posts', function ( req, res ){
  Post.find( function ( err, posts, count ){
    res.render( 'admin/postlist', {
      title : 'Posts List',
      posts : posts
    });
  });
});

/* GET Create posts page. */
router.get('/posts/create', function (req, res) {
  if(req.session.curr_user && req.session.curr_user.username == 'admin'){
    res.render('admin/create_post', {title: 'Create Post'});
  }
});

/*POST Create posts*/
router.post('/posts/create', function ( req, res ){
  new Post({
    author       : req.body.author,
    title        : req.body.title,
    content      : req.body.content,
    updated_at : Date.now()
  }).save( function( err, post, count ){
    req.flash('Post successfully created.');
    res.redirect( '/admin/posts' );
  });
});


/*GET Edit Post*/
router.get('/posts/:pid/edit', function ( req, res ){
  Post.findById( req.params.pid, function ( err, post ){
    res.render( 'admin/edit_post', {
    title: 'Edit Post',
    post: post
    });
  });
});

/*POST Edit Post */
router.post('/posts/:pid/edit', function ( req, res ){
  Post.findById( req.params.pid, function ( err, post ){
    post.title      = req.body.title;
    post.author     = req.body.author;
    post.content    = req.body.content;
    post.updated_at = Date.now();
    post.save( function ( err, post, count ){
      req.flash('status', 'Post successfully edited.');
      res.redirect( '/admin/posts' );
    });
  });
});

/*GET Delete Post*/
router.get('/posts/:pid/delete', function ( req, res ){
  Post.findById( req.params.pid, function ( err, post ){
    post.remove( function ( err, posts ){
        req.flash('status', 'Post successfully deleted');
      res.redirect( '/admin/posts' );
    });
  });
});

module.exports = router;
