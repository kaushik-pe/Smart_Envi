var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var url = require('url');
var querystring = require('querystring');
var gval;
var flag=0;
var client = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'listenurheart'
});
router.get('/', function (req, res) {
    url = url.parse(req.url);
    var arr = [];
    arr = querystring.parse(url.query);
    var str = arr['ID'];
    var id = [];
    id=str.split(',');
    console.log(str);    
    client.query('use smart_envi'); //read info from dev_details table
    client.query('select * from dev_details where ID =' + str, function(err, data) {
        if (data[0].query_status === 'Approved') {
            client.query('update dev_details set query_status = "Not Approved" where ID =' + str);  
            client.query('update dev_details set request_age = "old" where ID =' + str);
            client.query('select * from dev_query where ip_addr =' + data[0].ip_addr, function(err1, data1) {
             //delete two default queries
                var ip= data[0].ip_addr;
                console.log(ip);
           client.query("delete from dev_query where ip_addr ='" + data[0].ip_addr +"';");
            });
        } else {
            client.query('update dev_details set query_status = "Approved" where ID =' + str);
            client.query('update dev_details set request_age = "old" where ID =' + str);
            client.query('select * from dev_query where ip_addr =' + data[0].ip_addr, function(err1, data1) {
                //insert two default queries
            client.query('insert into dev_query(ip_addr,type_cmd,param_1,param_2,email_notifications,user_id,query_status,query_type) values("'+data[0].ip_addr+'","turnon","everday","9:00","false","'+data[0].user_id+'","Approved","Default");');
            client.query('insert into dev_query(ip_addr,type_cmd,param_1,param_2,email_notifications,user_id,query_status,query_type) values("'+data[0].ip_addr+'","turn_off","everday","19:00","false","'+data[0].user_id+'","Approved","Default");');
            });
    } 
    });
     
    res.writeHead(200);
    res.write("update_success");
    res.end();
});
module.exports = router;