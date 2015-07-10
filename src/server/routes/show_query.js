var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var querystring = require('querystring');
var url = require('url');
var client = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'listenurheart'
});
/* similar show dev_table refer that file for comments if required*/
router.get('/',function(req,res){
console.log(req.session.ip);
    client.query('use smart_envi');
    var ip=req.session.ip;
    
var str1='select * from dev_query where ip_addr="'+ip+'";';    
client.query(str1,function(err,data){
var str=JSON.stringify(data);//converting json object to string
console.log(str);
res.writeHead(200,{'Content-type':'text/plain'});
res.write(str);
res.end();
});


    
    
    
    
});
module.exports = router;