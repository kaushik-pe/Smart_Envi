var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var url = require('url');
var querystring = require('querystring');
var gval;

var client = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'listenurheart'
});
router.get('/',function(req,res){
url = url.parse(req.url);
var arr=[];
arr = querystring.parse(url.query); 
    console.log(arr);
client.query('use smart_envi');
//read info from dev_details table
       var queryString = 'SELECT * FROM users where user_type="admin";';
          client.query(queryString, function (err, data) {   
            if (err) {
                throw err;
            }
             else{
                 console.log(34);
    /*data returned from the db will be in the form of an object*/
    var str=JSON.stringify(data);//converting json object to string
        console.log(str);
    res.writeHead(200,{'Content-type':'text/plain'});
    res.write(str);
    res.end();
             }
        });
});

module.exports = router;