var show_dev_table = require('./routes/show_dev_table');
var show_admin_table = require('./routes/show_admin_table');
var show_admin_groupnotify = require('./routes/show_admin_groupnotify');
var show_admin_table_new = require('./routes/show_admin_table_new');
var show_query = require('./routes/show_query');
var insert_dev = require('./routes/insert_dev');
var insert_query = require('./routes/insert_query');
var del_query = require('./routes/del_query');
var insert_admin = require('./routes/insert_admin');
var approve = require('./routes/approve');
var approve_q = require('./routes/approve_q');
var group_admin1 = require('./routes/group_admin1');
var ins_dev_group = require('./routes/ins_dev_group');
var show_dev_group = require('./routes/show_dev_group');
var del_dev = require('./routes/del_dev');
var search_dev_group = require('./routes/search_dev_group');
var search_device = require('./routes/search_device');
var del_admin = require('./routes/del_admin');
var url = require('url');
var admin_flag = 0;
var querystring = require('querystring');
var email;
var mysql            = require('mysql');
var http             = require('http');
var path             = require('path');
var connection = mysql.createConnection(
    {
        host        : "localhost",
        user        : "root",
        password    : "listenurheart",
        database    : "smart_envi"
    }
);

module.exports = function(app, passport) {

    // route for home page
    app.get('/',  function (req, res) {
         console.log(req.isAuthenticated());
        if (req.isAuthenticated()){
            //console.log("Initial Auth")
            res.redirect('/newindex');}
        else{
        res.render('login2.html'); // load the index.ejs file
        user : req.session.passport.user}
    });

    // route for showing admin / user page
    app.get('/newindex', isLoggedIn, function (req, res) {
        email = req.session.passport.user._json.email;
        console.log(email);
        setTimeout(function(){
       
        var queryString = 'SELECT * FROM users;';
        connection.query(queryString, function (err, rows, fields) {   
            if (err) {
                throw err;
            }
            for (var i in rows) {
                  if(rows[i].email === email && rows[i].user_type === "supradmin") {
                      admin_flag = 2;
                      break;
                  } else if (rows[i].email === email && rows[i].user_type === "admin") {
                      console.log("ADMN");
                      admin_flag = 1;
                      break;
                  }
            }
        if (admin_flag === 1) {
            res.render('admin.html', {
                user : req.session.passport.user
            }); 
        }else if (admin_flag === 2) {
            res.render('supr_admin.html', {
                user : req.session.passport.user
            });
            admin_flag = 0;
        } else { // if the user isnt in our database, create a new user
            res.render('newindex.html', { 
            user : req.session.passport.user
          // get the user out of session and pass to template
        });
        }
        });
             }, 1000 );
    });

    
    
     // route for showing the app index page
    app.get('/app_index', isLoggedIn, function(req, res) {
        res.render('app_index.html', {
        user : req.session.passport.user
        });
    });
    
        // route for showing the app index page
    app.get('/admin', isLoggedIn, function(req, res) {
        res.render('admin.html', {
        user : req.session.passport.user
        });
    });
    
        // route for showing the app index page
    app.get('/supr_admin', isLoggedIn, function(req, res) {
        res.render('supr_admin.html', {
        user : req.session.passport.user
        });
    });
    
         // route for showing the app index page
    app.get('/general_details', isLoggedIn, function(req, res) {
        res.render('general_details.html', {
        user : req.session.passport.user
        });
    });
    
    app.get('/disp_dev_group', isLoggedIn, function(req, res) {
            var queryString = 'SELECT * FROM users;';
        connection.query(queryString, function (err, rows, fields) {   
            if (err) {
                throw err;
            }
            for (var i in rows) {
                  if(rows[i].email === email && rows[i].user_type === "supradmin") {
                      admin_flag = 1;
                      break;
                  }
            }
        if (admin_flag === 1) {
            res.render('disp_dev_group.html', {
                user : req.session.passport.user
            });
            admin_flag = 0;
        } else { // if the user isnt in our database, create a new user
            res.render('newindex.html', { 
            user : req.session.passport.user
          // get the user out of session and pass to template
        });
        }
        });
    });
    app.get('/add_dev_group', isLoggedIn, function(req, res) {
         var queryString = 'SELECT * FROM users;';
        connection.query(queryString, function (err, rows, fields) {   
            if (err) {
                throw err;
            }
            for (var i in rows) {
                  if(rows[i].email === email && rows[i].user_type === "supradmin") {
                      admin_flag = 1;
                      break;
                  }
            }
        if (admin_flag === 1) {
            res.render('add_dev_group.html', {
                user : req.session.passport.user
            });
            admin_flag = 0;
        } else { // if the user isnt in our database, create a new user
            res.render('newindex.html', { 
            user : req.session.passport.user
          // get the user out of session and pass to template
        });
        }
        });
    });
    
    
            // route for showing the app index page
   app.get('/save_ip', isLoggedIn, function(req, res) {
        req.session.ip=req.query.ip;
        res.write('hello!!!');
        res.end();
      
    
    });
    
         // route for showing the app index page
    app.get('/add_device', isLoggedIn, function(req, res) {
        res.render('add_device.html', {
            user : req.session.passport.user // get the user out of session and pass to template
        });
    });
    
           // route for showing the app index page
    app.get('/group_admin', isLoggedIn, function(req, res) {
        res.render('group_admin.html', {
            user : req.session.passport.user // get the user out of session and pass to template
        });
    });
 
           // route for showing the app index page
    app.get('/approval', isLoggedIn, function(req, res) {
       email = req.session.passport.user._json.email;
        console.log(email);
        var queryString = 'SELECT * FROM users;';
        connection.query(queryString, function (err, rows, fields) {   
            if (err) {
                throw err;
            }
            for (var i in rows) {
                  if(rows[i].email === email && ((rows[i].user_type === "admin") || (rows[i].user_type === "supradmin"))){
                      console.log("ADMIN CHECK");
                      admin_flag = 1;
                      break;
                  }
            }
        if (admin_flag === 1) {
            res.render('approval.html', {
                user : req.session.passport.user
            });
            admin_flag = 0;
        } else { // if the user isnt in our database, create a new user
            res.render('newindex.html', { 
            user : req.session.passport.user
          // get the user out of session and pass to template
        });
        }
        });
    });

           // route for showing the app index page
    app.get('/approval_q', isLoggedIn, function(req, res) {
       email = req.session.passport.user._json.email;
        var queryString = 'SELECT * FROM users;';
        connection.query(queryString, function (err, rows, fields) {   
            if (err) {
                throw err;
            }
            for (var i in rows) {
                  if(rows[i].email === email &&  ((rows[i].user_type === "admin") || (rows[i].user_type === "supradmin"))) {
                      console.log("ADMIN CHECK");
                      admin_flag = 1;
                      break;
                  }
            }
        if (admin_flag === 1) {
            res.render('approval_q.html', {
                user : req.session.passport.user
            });
            admin_flag = 0;
        } else { // if the user isnt in our database, create a new user
            res.render('newindex.html', { 
            user : req.session.passport.user
          // get the user out of session and pass to template
        });
        }
        });
    });
  
        // route for showing the add query page
    app.get('/add_query', isLoggedIn, function(req, res) {
        res.render('add_query.html', {
            user :req.session.passport.user // get the user out of session and pass to template
        });
    });
    
    app.use('/show_dev_table', show_dev_table);
    app.use('/show_admin_table', show_admin_table);
    app.use('/show_admin_table_new', show_admin_table_new);
    app.use('/show_admin_groupnotify', show_admin_groupnotify);
    app.use('/show_query', show_query);   
    app.use('/insert_dev', insert_dev);
    app.use('/insert_query', insert_query);
    app.use('/insert_admin', insert_admin);
    app.use('/del_query', del_query);
    app.use('/approve', approve);
    app.use('/approve_q', approve_q);
    app.use('/ins_dev_group', ins_dev_group);
    app.use('/group_admin1', group_admin1);
    app.use('/show_dev_group', show_dev_group);
    app.use('/search_dev_group', search_dev_group);
    app.use('/search_device', search_device);
    app.use('/del_dev',del_dev);
    app.use('/del_admin',del_admin);
    
 
    
    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect("https://mail.google.com/mail/u/0/?logout&hl=en");
        //console.log("USER AFTER LOGOUT"):
       // console.log(user);
//        res.redirect('/');
    });



    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/newindex',
                    failureRedirect : '/'
            }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
         if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  
}




   
        
 
