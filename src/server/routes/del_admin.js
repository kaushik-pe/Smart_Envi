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
arr=querystring.parse(url.query);
console.log(arr);
var str = arr['ip'];
var db_query = 'delete from users where email="'+str+'";'
client.query('use smart_envi;');
client.query(db_query);
res.writeHead(200);
res.write("delete_success");
res.end();
});

module.exports = router;
