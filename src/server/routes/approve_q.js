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
    var str = arr['ID'];
var id = [];
id=str.split(',');
console.log(str);    
client.query('use smart_envi');
//read info from dev_details table

//console.log(id[i]);
    client.query('select * from dev_query where ID='+str,function(err,data){
        
        if(data[0].query_status=='Not Approved')
        {
         client.query('update dev_query set query_status = "Approved" where ID='+str);  
         client.query('delete from dev_query where ID='+str);
        }
               
    });


res.writeHead(200);
res.write("update_success");
res.end();
});


module.exports = router;