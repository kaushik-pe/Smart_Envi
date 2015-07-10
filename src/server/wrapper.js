var http = require('http');
var mysql = require('mysql');
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});
var params = "__SL_P_ULD=LED";


module.exports = {
control : function(ip_addr,cmd)
{
     var stat="_ON";
    if(cmd=="turn_off")
    {
        var stat="_OFF";
        
    }
    var options = {
    hostname: '192.168.1.143',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Content-length': params.length+stat.length+1 ,
      'Connection' : 'close'
         
    }
    };
    
    
      
    client.query('use smart_envi;');
    client.query('select * from dependant_dev where ip_addr="'+ip_addr+'";',function(err,data,fields){
    if(err)
        console.log(err);
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
        });
    });    
  
     for (var key in data[0]) {
    
         
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


