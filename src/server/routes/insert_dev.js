var express = require('express');
var router = express.Router();
var url= require('url');
var fs = require('fs');
var querystring = require('querystring');
var mysql = require('mysql');
var flag=0;
var group_no=0;
var dep="";
var client = mysql.createConnection({//credentials to connect with the database
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});
router.get('/', function(req, res) {
 url=url.parse(req.url);//obtaining form data from the url
 var arr=[];
 arr=querystring.parse(url.query);
 console.log(arr); 
dep = arr['dep_id'];
client.query('use smart_envi;');//selecting the db
client.query('select * from dev_details;',function(err, rows, fields){
if (err) {
                throw err;
            }
            for (var i in rows) {
                  if(rows[i].ip_addr === arr['ip_addr']) {
                     flag=1;
                      
                      break;
                  }
            }
    console.log(flag);  
    if(flag==0)
    {
        res.writeHead(200);
        res.write("sucess");
        res.end();
        
    }
    else
    {
        res.writeHead(200);
        res.write("failure");
        res.end();
    }

/*if device has been already added by another user */    

    
         var queryString = 'SELECT * FROM dev_group;';
        client.query(queryString, function (err,dt) {   
            for(i=0;i<dt.length;i++)
                {
                    if(arr['ip_addr']==dt[i].ip_addr)
                    {
                        group_no = dt[i].group_no;  
                        console.log("Group_no ="+group_no);
                        break;
                    }

                }
            
            if(flag==0){
          
            
    console.log('group_no='+group_no);
            
/*if device hasn't been already added by another user insert into dev_details table */    
client.query('insert into dev_details (name,mac_addr,ip_addr,power_id,dev_type,user_id,group_name) values("'+arr['name']+'","'+arr['mac_addr']+'","'+arr['ip_addr']+'","'+arr['power_id']+'","'+arr['dev_type']+'","'+arr['user_id']+'","'+group_no+'")');
group_no = 0;
                

   str="Request to add device sent to admin successfully";  
            
            }
/*if device has been already added notify the user */        
else {
    flag = 0;
            }
        });
         
        });
if(dep!="")
{
   
    var ip_addr = [];
    ip_addr = dep.split(",");
    for(i=0;i<10;i++)
    {
        if (typeof ip_addr[i] === 'undefined'||ip_addr[i]== "") {
            ip_addr[i]="no_dep";
        }
        
        
    }
    client.query('insert into dependant_dev values("'+arr['ip_addr']+'","'+ip_addr[0]+'","'+ip_addr[1]+'","'+ip_addr[2]+'","'+ip_addr[3]+'","'+ip_addr[4]+'","'+ip_addr[5]+'","'+ip_addr[6]+'","'+ip_addr[7]+'","'+ip_addr[8]+'","'+ip_addr[9]+'");',function(err){
    if(err)
    {
        console.log(err);
    }
    });
}    
});

module.exports = router;
