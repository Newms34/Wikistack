var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Page, User, Hist;
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title: String,//protected
  url_name: String,//protected
  owner_id:   String, //changes per update
  body:   String, //changes. duh.
  date: { type: Date, default: Date.now }, //updates every update
  status: Number,
  tags: String
});

pageSchema.virtual('full_route').get(function(){
  return '/wiki/'+this.url_name;
});

var userSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  email: String
});


//this one may need to be fixed!
var histSchema = new Schema({
  title: String,
  url_name: String,
  owner_id:   String,
  body:   String,
  date: { type: Date, default: Date.now },
  status: Number
})

Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);
Hist = mongoose.model('Hist', histSchema);

module.exports = {"Page": Page, "User": User, "Hist": Hist};
