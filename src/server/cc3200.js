var http = require('http');
var mysql = require('mysql');
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});
var params = "__SL_P_ULD=LED";


module.exports = {
cc_control : function(ip_addr,cmd,socket_id)
{
    
    console.log(ip_addr+" "+cmd+" "+socket_id);
    var stat="_ON";
    if(cmd=="turn_off")
    {
        var stat="_OFF";
        
    }
    var power_id = socket_id.toString();
    var options = {
    hostname: power_id,
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Content-length': params.length+stat.length+1,
      'Connection' : 'close'
         
    }
    };
    
    
      
    client.query('use smart_envi;');
    
    client.query('select * from dependant_dev where ip_addr="'+ip_addr+'";',function(err,data,fields){
    if(err)
        console.log(err);
        console.log("working!!!");
    var req = http.request(options, function(res) {
    console.log('working2!!!');    
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
        });
    });   
	req.on('error', function (err) {
		console.log("error!!!");
		});
  
     for (var key in data[0]) {
         //console.log(data);
    
         
         if(data[0][key]!='no_dep'&&key!='ip_addr')
         {
             params+=data[0][key];
             params+=stat;
             console.log(params);
             //console.log(req);
             req.write(params);
             req.end();
              var req = http.request(options, function(res) {
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
              console.log('Response: ' + chunk);
              });
    });
             params = "__SL_P_ULD=LED";
          }
   // do some more stuff with obj[key]
        }
        req.end()
       
      return;
    });
    
}

};


