var express = require('express');
var router = express.Router();

//database connection
var mongoose = require( 'mongoose' );
var Post     = mongoose.model( 'Post' );

/* GET All posts */
router.get('/', function ( req, res ){
  Post.find({ 'author': req.session.curr_user._id }, function ( err, posts, count ){
    res.render( 'posts/list', {
      title : 'Blog posts',
      posts : posts
    });
  });
});

/* GET Create posts page. */
router.get('/create', function (req, res) {
  res.render('posts/create', {title: 'Create Post', user: req.session.curr_user});
});

/*POST Create posts*/
router.post('/create', function ( req, res ){
  new Post({
    author       : req.session.curr_user._id,
    title        : req.body.title,
    content      : req.body.content,
    updated_at : Date.now()
  }).save( function( err, post, count ){
    req.flash('status', 'Post successfully created.');
    res.redirect( '/users/'+req.session.curr_user._id+'/posts' );
  });
});

/*GET Edit Post*/
router.get('/:pid/edit', function ( req, res ){
  Post.findById( req.params.pid, function ( err, post ){
    res.render( 'posts/edit', {
    title: 'Edit Post',
    post: post
    });
  });
});

/*POST Edit Post */
router.post('/:pid/edit', function ( req, res ){
  Post.findById( req.params.pid, function ( err, post ){
    post.title      = req.body.title;
    post.content    = req.body.content;
    post.updated_at = Date.now();
    post.save( function ( err, post, count ){
      req.flash('status', 'Post successfully edited.');
      res.redirect( '/users/'+req.session.curr_user._id+'/posts' );
    });
  });
});

/*GET Delete Post*/
router.get('/:pid/delete', function ( req, res ){
  Post.findById( req.params.pid, function ( err, post ){
    post.remove( function ( err, posts ){
      req.flash('status', 'Post successfully deleted.');
      res.redirect( '/users/'+req.session.curr_user._id+'/posts' );
    });
  });
});

module.exports = router;
