var express = require('express');
var router = express.Router();
var url= require('url');
var fs = require('fs');
var querystring = require('querystring');
var mysql = require('mysql');
var flag=0;
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});

/* GET home page. */
router.get('/', function(req, res) {
url=url.parse(req.url);//obtaining form data from the url
var arr=[];
arr=querystring.parse(url.query);
console.log(arr);    
client.query('use smart_envi;');//selecting the db
var str="insert into dev_group values('"+arr['ip_addr']+"','"+arr['group_no']+"');";
                    

client.query(str);
res.write("success!!");
res.end();
});
module.exports = router;
