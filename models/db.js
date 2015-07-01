var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var User = new Schema({
    username   : String,
    password   : String,
    firstname  : String,
    middlename : String,
    lastname   : String,
    about      : String,
    birthday   : Date,
    updated_at : Date
});

var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

var Post = new Schema({
  author       : String,
  title        : String,
  content      : String,
  updated_at   : Date
});

mongoose.model( 'User', User );
mongoose.model( 'Todo', Todo );
mongoose.model( 'Post', Post);

mongoose.connect( 'mongodb://localhost/myapp3' );
