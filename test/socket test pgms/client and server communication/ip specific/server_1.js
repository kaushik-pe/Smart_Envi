var sockets = [];
var ip = [];
var server = require('net').createServer();
server.maxConnections=3;
server.listen(3000,"192.168.1.172");
server.on('connection',function(socket){
                    console.log("Connected to a new client!!");    
                    sockets.push(socket);
                    socket.write('Welcome to sample TCP server!');
                    socket.on('data',function(data){
                    var str=data.toString();
                    var str = data.toString();
                    console.log(str);
                        if(str.search('ip')!==-1)
                        {
                            save_ip(str);   
                        }
                        
                    });
});
server.on('listening',function(){
console.log('Server listening for client requests!!');    
});
server.on('error',function(err){
                    console.log(err);    
});
function save_ip(ip_raw)
{
    console.log(ip_raw);
    var substr=ip_raw.replace("ip","");
    ip.push(substr);
}