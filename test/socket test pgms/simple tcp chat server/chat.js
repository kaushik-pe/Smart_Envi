var clients = [];
var server = require('net').createServer();
var str;
server.listen(1111,"192.168.1.172");
server.on('connection',function(socket){
                    var msg="";
                    console.log("Connected to a new client!!"); 
                    socket.client_id="Client "+parseInt(clients.length+1);
                    clients.push(socket);
                    socket.write('Welcome to sample TCP chat server!\n\r Client:'+clients.length+":");
                    socket.on('data',function(data){
                    console.log(data.toString());    
                    var str4=data.toString();
                    var asci=str4.charCodeAt(0);
                    if(asci!==13)
                    {
                     msg=msg+str4;
                     }
                    else
                    {
                    clients.forEach(function(othr){
                    if(othr !== socket)
                        {
                            var str="\n\r"+socket.client_id+":"+msg+"\n\r"+othr.client_id+":";
                            othr.write(str);                 
                        }
                    else
                        {
                            var str=socket.client_id+":";
                            othr.write(str);                 
                                                    
                        }
                        
                        });
                        msg="";    
                    }
                });
               show_all(); 
    
});
server.on('listening',function(){
console.log('Server listening for client requests!!');    
});
server.on('error',function(err){
                    console.log(err);    
});
function show_all()
{
 var i=0;
    for(i=0;i<clients.length;i++)
    {
        console.log(clients[i].remoteAddress);
          
    }
}