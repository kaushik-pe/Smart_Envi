// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();

var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');



// configuration ===============================================================


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


//app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch',
                  cookie: {maxAge: 60000000000000000000000000000000000000},
	proxy:  true,
    resave: true,
    saveUninitialized: true
                })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(8080);
console.log('The magic happens on port 8080');