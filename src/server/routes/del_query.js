var express = require('express');
var router = express.Router();
var url= require('url');
var querystring = require('querystring');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kaushikpe.it11@bitsathy.ac.in',
        pass: 'tn43b7178K!'
    }
});
var mailOptions;
/* similar to insert_dev refer the commments given there if required*/
router.get('/', function(req, res) {
console.log(req.url);    
url=url.parse(req.url);
var arr=[];
arr=querystring.parse(url.query);
console.log(arr);
var str = arr['ID'];
var id = [];
id=str.split(',');
client.query('use smart_envi;');
for(i=0;i<id.length;i++)
{
//console.log(id[i]);
    var str1 = 'select * from dev_query where ID="'+id[i]+'";';
    var id_current=id[i];
    client.query(str1,function(err,data){
        //console.log(data);
    //console.log(data[0].query_type); 
    var ip_addr = data[0].ip_addr;
    if(data[0].query_type==="Custom")
    {
client.query('delete from dev_query where ID='+id_current);
    
    }
    else
    {   
            client.query('select * from dev_details where ip_addr="'+ip_addr+'";', function(err,data1){
               // console.log(data1[0].mac_addr);
          
         client.query('select * from users where group_name="'+data1[0].group_name+'" AND user_type="admin" or user_type="supradmin";', function(err,data2){
                console.log(data2[0].email);
             
                     mailOptions = {
                        from: 'kaushikpe.it11@bitsathy.ac.in', // sender address
                        to: ''+data2[0].email+'', // list of receivers
                        subject: 'SMART ENVI UPDATE', // Subject line
                        text: 'DEFAULT QUERY IS BEING CHANGED ', // plaintext body
                        html: '<b>DEFAULT QUERY IS BEING CHANGED </b> '// html body
                    };  
                 transporter.sendMail(mailOptions, function(error, info){
        if(error){
                  console.log(error);
                 }
        else{
         console.log('Message sent: ' + info.response);
                                                }
        }); 
                
            });
                 
            });
        client.query('update dev_query set query_status="Not Approved" where ID='+id_current);
        //client.query('delete from dev_query where ID='+id_current);
        console.log("Need Admin permission");
    }
});
res.writeHead(200);
res.write("delete_success");
res.end();}
});

module.exports = router;
