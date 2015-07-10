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
client.query('use smart_envi');
//read info from dev_details table
       console.log(arr['userid']);
    
        var queryString = 'SELECT * FROM users;';
        client.query(queryString, function (err, rows, fields) {   
            if (err) {
                throw err;
            }
            for (var i in rows) {
                  if(rows[i].email === arr['userid']) {
                     gval=rows[i].group_name;
                     break;
                  }
            }

    
    client.query('select * from dev_query where group_name="'+gval+'";',function(err,data){  /*data returned from the db will be in the form of an object*/
    var str=JSON.stringify(data);//converting json object to string
    res.writeHead(200,{'Content-type':'text/plain'});
    res.write(str);
    res.end();

});
});
});


module.exports = router;