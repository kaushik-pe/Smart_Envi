// config/passport.js

// loading all things
var count = 0;
var mysql = require('mysql');
var http  = require('http');
var path  = require('path');
var fs = require('fs');

//establishing database connection
var connection = mysql.createConnection(
    {
        host        : "localhost",
        user        : "root",
        password    : "listenurheart",
        database    : "smart_envi"
    });

var user = new Object();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load the auth variables
var configAuth = require('./auth');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
    
    //using GoogleStrategy
    
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback   : true
    },
        function (req, token, refreshToken, profile, done) { // return done(null, profile);
            console.log("function called after google login");  // try to find the user based on their google id
            var queryString = 'SELECT * FROM users;';
            connection.query(queryString, function(err, rows, fields) {
                if (err) 
                throw err;
                for (var i in rows) {
                    if(rows[i].email === profile.emails[0].value) {
                        console.log("OLD USER");
                        user=rows[i];
                        count = 1;
                        break;
                    } 
                } if (count === 1) {
                    console.log(user);// if a user is found, log them in
                } else { 
                    console.log("NEW USER");// if the user isnt in our database, create a new user
                    var newUser = new Object();
                    // set all of the relevant information
                    newUser.id    = profile.id;                   
                    newUser.name  = profile.displayName;
                    newUser.email = profile.emails[0].value; // pull the first email 
                    var buffer= fs.readFileSync('./supr_admin.txt'); //reading file with super admin details
                    var data2=buffer.toString();
                    var data2=data2.replace(/\r\n/g," ");
                    var admin_arr2=[];
                    admin_arr2=data2.split(" ");
                    var i=0;
                    var group_no=1;
                    var flag =0;
                    for(i=0;i<admin_arr2.length;i++) {
                    if(newUser.email === admin_arr2[i]) { //Checking file for super admin
                        console.log("SUPR ADMIN");
                        group_no=1;
                        flag=2;
                        break;
                    } 
                    } if(flag==0) { //normal user
                        var querystring = 'insert into users(email,group_name,user_type) values("'+newUser.email+'","'+group_no+'","user");';
                        connection.query(querystring);
                        }else { //super user
                        var querystring = 'insert into users(email,group_name,user_type) values("'+newUser.email+'","'+group_no+'","supradmin");';
                        connection.query(querystring);
                        }
                }
            });
            return done(null, profile); // data of user from Google given to app
        }));
}



        
    