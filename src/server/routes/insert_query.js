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
client.query('use smart_envi;');
client.query('insert into dev_query(ip_addr,type_cmd,param_1,param_2,email_notifications,user_id,query_type) values("'+req.session.ip+'","'+arr['type_cmd']+'","'+arr['param_1']+'","'+arr['param_2']+'","'+arr['email_notifications']+'","'+arr['user_id']+'","Custom")');
res.writeHead(200);
res.write("hi!!!");
res.end();

});

module.exports = router;
