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
//console.log(user.id);    
client.query('use smart_envi');
//read info from dev_details table
var que = 'select * from dev_details where ip_addr="'+arr['ip_addr']+'";'; 
console.log(que);
client.query(que,function(err,data){
var str=JSON.stringify(data);//converting json object to string
res.writeHead(200,{'Content-type':'text/plain'});
res.write(str);
res.end();
    
    
});
    

});


module.exports = router;