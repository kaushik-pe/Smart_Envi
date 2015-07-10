var http=require('http').createServer(ser_calbck);
var io=require('socket.io').listen(http);
var fs=require('fs');
var mysql = require('mysql');
var clients = [];
var fs = require('fs'); 
var wol = require('wake_on_lan');
var email_notify= 'email_false';
var nodemailer = require('nodemailer');
var con = require('./wrapper1.js');
var exec = require('child_process').exec;
http.listen(5000,'192.168.1.176');
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'listenurheart'
});
var con = require('./wrapper1.js');
var client_msg = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({ //authentication details of the sender's mail ID
    service: 'Gmail',
    auth: {
        user: 'kaushikpe.it11@bitsathy.ac.in',
        pass: 'tn43b7178K!'
    }
});
var mailOptions;

function ser_calbck(req,res)                                   //serving administrator page(test page)
{
    res.writeHead(200);
    fs.readFile('admin.html',function(err,data){
    res.write(data.toString());   
    res.end();
    });
}

io.sockets.on('connection',function(socket){ 
clients.push(socket);     

socket.on("check_status",function(content){
	console.log("IP Address= "+content); 
	var flag2 =0;
	for(j=0;j<clients.length;j++)                                     
		{
		 if(content==clients[j].handshake.address)
			{
				flag2=1;
				break;
			}
		}
	if(flag2==1)
		{
			socket.emit("status","online");
		}
	 else
	 	{
		 socket.emit("status","offline");
	 	}
});
socket.on('get_ip',function(){
socket.emit('ip_val',socket.handshake.address)    
    
});
socket.on('get_mac',function(content){
        
    
         var buf = exec('arp -a',function(err,stdout){
        var str = [];
        var str1 = stdout.replace(/ /g," ");
        str = str1.split(" ");
        var value = content;
        for(i=0;i<str.length;i++)
        {
           if(str[i]==value)
           {
                for(j=i+1;j<str.length;j++)
                    {
                        if(str[j]!="")
                        {
                            socket.emit("mac_val",str[j]);
                            break;
                        }
                    }
           }
        }

    });

    
});
socket.on('shut_down',function(content){
console.log("shutdown");
client.query('use smart_envi');
client.query("select * from dev_details where ip_addr='"+content +"';",function(err,data){
if(err)
    console.log(err);
shutdown(content,data[0].power_id,data[0].dev_type);
});
});    
socket.on('hibernate',function(content){
client.query('use smart_envi');    
client.query("select * from dev_details where ip_addr='"+content +"';",function(err,data){
client.query('use smart_envi');
hibernate(content,data[0].power_id,data[0].dev_type);
});
});
socket.on('turnon',function(content){
get_mac(content);
client.query('use smart_envi');    
client.query("select * from dev_details where ip_addr='"+content +"';",function(err,data){
if(err)
    console.log(err);
	con.control(content,"turn_on",data[0].power_id,data[0].dev_type);
});
});
    
    
 socket.on('disconnect', function() {    
 var pos= clients.indexOf(socket);
 clients.splice(pos,1);
 });
 socket.on('error', function(exception) {
  console.log('SOCKET ERROR');
})
//save the sockets of all systems in an array
console.log(socket.handshake.address);   
});
function shutdown(key_ip,power_id,dev_type){
 console.log("Shutdown :"+key_ip);    
 var j=0,flag=0;
//when shutdown caommand is received traverse the array and search for the socket with                       the specified ip   
for(j=0;j<clients.length;j++)                                     
{
 if(key_ip==clients[j].handshake.address)
    {
        clients[j].emit('admin_message','shutdown');//if found emit shutdown command to           through the socket                                
        flag=1;
		clients[j].power_id = power_id;
		clients[j].dev_type = dev_type;
		console.log(clients[j].power_id+" "+clients[j].dev_type);
        console.log('Element found!!!');    
        if(email_notify=="email_true")
        {
        transporter.sendMail(mailOptions, function(error, info){
        if(error){
                  console.log(error);
                 }
        else{
         console.log('Message sent: ' + info.response);
            }
        }); 
        }
		con.control(key_ip,"turn_off",power_id,dev_type);
				

       
        }
    }

   
    
}

function get_mac(value)
{
   var buf = exec('arp -a',function(err,stdout){
   var str = [];
   var str1 = stdout.replace(/ /g," ");
   str = str1.split(" ");
   for(i=0;i<str.length;i++)
        {
           if(str[i]==value)
           {
                for(j=i+1;j<str.length;j++)
                    {
                        if(str[j]!="")
                        {
                            wol.wake(str[j],function(err){
                                    if(err)
                                        console.log("Error in using wol"+err);
                                    else
                                        console.log(str[j]+" has been woke up!");
                    
                    });  
                            break;

                        }
                    }
           }
        }   
   });
}
function hibernate(key_ip,power_id,dev_type){
console.log("Hibernate :"+key_ip);    
 var j=0,flag=0;
//when hiberante command is received traverse the array and search for the socket with                  the specified ip   
for(j=0;j<clients.length;j++)                                     
{
 if(key_ip==clients[j].handshake.address)
    {
        clients[j].emit('admin_message','hibernate');//if found emit hibernate command to the client app through the socket                                
        flag=1;
        console.log('Element found!!!');    
        if(email_notify=="email_true")
        {
        
        transporter.sendMail(mailOptions, function(error, info){
        if(error){
                  console.log(error);
                 }
        else{
         console.log('Message sent: ' + info.response);
            }
        });      
        }
           console.log('working!!!');
           con.control(key_ip,"turn_off",power_id,dev_type);  
      }
    }

    
    
}
setInterval(function(){
    
    client.query('use smart_envi');
    client.query('select * from dev_query',function(err,data){ // search the database every minute for queries to be executed.
        for(i=0;i<data.length;i++)
        {
           var str1 = data[i].param_2;   //get the time specified from the query
           var dte = new Date();         //get current time
           var h = dte.getHours();
           var g = dte.getMinutes();
           email_notify = data[i].email_notifications;// check whether email notifications is enabled
           if(g<10)
           {
             g="0"+g;   
           }
           if(h<10)
           {
           var str2="0"+h+":"+g+":00";
           }
           else
           {
           var str2=h+":"+g+":00";
           }//change the system time to compare with query time
           console.log('TIME:'+str1+' ,USER ID:'+data[i].user_id+',IP_ADDR :'+data[i].ip_addr+',\nSERVER_TIME:'+str2);    
           if(str1==str2)           // if both times are equal search what command is to executed
           {
                if(data[i].type_cmd=='turn_off')
                {
                    var sos;
                    sos= fs.readFileSync('./email-content/shut_msg.txt');//read mail content from file         
                    mailOptions = {                     //compose the mail
                        from: 'kaushikpe.it11@bitsathy.ac.in', // sender address
                        to: ''+data[i].user_id+'', // list of receivers
                        subject: 'SMART ENVI UPDATE', // Subject line
                        text: 'YOUR SYSTEM HAS BEEN SHUTDOWN AT '+str2, // plaintext body
                        html: '<b>YOUR SYSTEM HAS BEEN SHUTDOWN AT '+str2+'</b>'+sos.toString()
                           
                    };    
                    
                    shutdown(data[i].ip_addrdata[i].power_id,data[i].dev_type);  
                }
           else if(data[i].type_cmd=='hibernate')
               {
                   var sos;
                   sos= fs.readFileSync('./email-content/hib_msg.txt');  
                   mailOptions = {
                        from: 'kaushikpe.it11@bitsathy.ac.in', // sender address
                        to: ''+data[i].user_id+'', // list of receivers
                        subject: 'SMART ENVI UPDATE', // Subject line
                        text: 'YOUR SYSTEM HAS BEEN HIBERNATED AT '+str2, // plaintext body
                        html: '<b>YOUR SYSTEM HAS BEEN HIBERNATED AT '+str2+'</b> '+sos.toString// html body
                    };    
                
                   hibernate(data[i].ip_addr,data[i].power_id,data[i].dev_type);
                
                  
               }/* similar to shutdown*/
             else if(data[i].type_cmd=='turnon')
             {
                 console.log("hi!!");
                 var stre= 'select * from dev_details where ip_addr="'+data[i].ip_addr+'";';
                console.log(stre);
                client.query(stre,function(err,data1){
                    if(err)
                    console.log("Errot = "+err);
                    console.log(data1[0].mac_addr);
                    wol.wake(data1[0].mac_addr,function(err){
                    if(err)
                        console.log("Error in using wol"+err);
                    else
                    {
                        console.log(data1[0].mac_addr+" has been woke up!");
                        console.log("hello!!!");
                        con.control(data[i].ip_addr,"turn_on",data[i].dev_type,data[i].power_id);  
                    }
                    });               
                });
                  
                
             }
            /*similar to shutdown*/
            else if(data[i].type_cmd='wakeup')
            {
                var stre= 'select * from dev_details where ip_addr="'+data[i].ip_addr+'";';
                console.log(stre);
                client.query(stre,function(err,data1){
                    if(err)
                        console.log("Error = "+err);
                    console.log(data1[0].mac_addr);
                    wol.wake(data1[0].mac_addr,function(err){
                    if(err)
                        console.log("Error in using wol"+err);
                    else
                    {
                        
                        console.log(data1[0].mac_addr+" has been woke up!");
                        console.log("hello!!!");
                        con.control(data[i].ip_addr,"turn_on",data[i].dev_type,data[i].power_id);  
                    }
                    });               
                });
                
            }
           }
        }
        
        
        
    });
    
},60000);
http.on('listening',function(){
console.log('server created!!!');    
});
