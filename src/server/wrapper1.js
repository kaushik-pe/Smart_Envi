var http = require('http');
var mysql = require('mysql');
var cs = require('./cc3200');
var wemo_con = require('./wemo_con') 
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});
var params = "__SL_P_ULD=LED";


module.exports = {
control : function(ip_addr,cmd,socket_id,dev_type)
{
    console.log(ip_addr+" "+cmd+" "+dev_type+" "+socket_id) 
    
    if(dev_type=="cc_3200")
     {
         console.log("cc_3200");    
         cs.cc_control(ip_addr,cmd,socket_id);
     }
    else if (dev_type=="wemo")
     {
         console.log("wemo");
         wemo_con.control(socket_id,cmd);   
     }
}
};


