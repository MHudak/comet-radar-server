var express = require('express');
var app = express();
var mysql      = require('mysql');
var flash = require('connect-flash');
var express = require('express');
var passport = require('passport');
var util = require('util');
var LocalStrategy = require('passport-local').Strategy;
  

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

// configure Express
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/index.html');
}

//setup database connection
var connection = mysql.createConnection({
  host     : '69.195.124.139',
  user     : 'bsxpccom_teamX',
  password : 'C$1RFKqdCr&w',
  database : 'bsxpccom_cometradar'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//setup api routes
app.get('/api/getRoutes', function (req, res) {
	connection.query('SELECT * FROM `routes` ', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
		console.log('Error: ' + error);
		console.log('Results: ' + results);

  		res.send(results);
  		//connection.end(function(err) {
  	// The connection is terminated now
		//});
	});	
  	
});

app.get('/', function(req, res){
  console.log("root (/) requested");
  res.redirect('/index.html');
});

app.get(/\/(css|fonts|img|js|maps)\/.*/, function(req, res){
  res.sendFile(__dirname + '/admin' + req.originalUrl);
});

//setup static file serve for admin pages
app.use(function(req, res, next){
  return ensureAuthenticated(req, res, next);
  
});

app.use(express.static(__dirname + '/admin'));

app.listen(3000);



