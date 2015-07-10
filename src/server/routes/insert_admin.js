var express = require('express');
var router = express.Router();
var url= require('url');
var querystring = require('querystring');
var mysql = require('mysql');
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});

/* similar to insert_dev refer the commments given there if required*/
router.get('/', function(req, res) {
console.log(req.url);    
url=url.parse(req.url);
var arr=[];
var flag=0;
arr=querystring.parse(url.query);
client.query('use smart_envi;');
var queryString ='select * from users;';
   client.query(queryString, function (err, rows, fields) {
       if(err) {
           throw err;
       }
       else {
            for (var i in rows) {
                    if(rows[i].email === arr['email']) {
                        console.log("OLD USER is added as admin");
                        flag= 1;
                        break;
                    } 
            }
           if (flag==1) {
               client.query('update users set group_name = "'+arr['group_name']+'"AND user_type = "admin"');
               flag=0;
           } else {
client.query('insert into users(email, group_name, user_type) values("'+arr['email']+'","'+arr['group_name']+'","admin")');
       }
   }
   });
res.writeHead(200);
res.write("hi!!!");
res.end();

});

module.exports = router;
