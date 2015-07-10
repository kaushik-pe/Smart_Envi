var http=require('http').createServer(ser_calbck);
var io=require('socket.io').listen(http);
var fs=require('fs');
var wol=require('wake_on_lan');
var clients=[];
http.listen(5000,'192.168.1.172');
function ser_calbck(req,res)                                             //serving administrator page(test page)
{
    res.writeHead(200);
    fs.readFile('admin.html',function(err,data){
    res.write(data.toString());   
    res.end();
    });
}
io.sockets.on('connection',function(socket){ 
clients.push(socket);                                                    //save the sockets of all systems in an array
console.log(socket.handshake.address);   
socket.on('shutdown',function(content){
console.log("Shutdown :"+content);    
var key_ip=content.toString();
   
var i=0,flag=0;
//when shutdown caommand is received traverse the array and search for the socket with the specified ip   
    for(i=0;i<clients.length;i++)                                     
    {
        if(key_ip==clients[i].handshake.address)
        {
         clients[i].emit('admin_message','shutdown');//if found emit shutdown command to through the socket                                
         flag=1;
         console.log('Element found!!!');    
            
        }
    }

    
    
});
socket.on('sleep',function(content){
var key_ip=content.toString();
console.log("Sleep :"+content); 
var i=0,flag=0;
//when shutdown caommand is received traverse the array and search for the socket with the specified ip   
    for(i=0;i<clients.length;i++)                                     
    {
        if(key_ip==clients[i].handshake.address)
        {
         clients[i].emit('admin_message','sleep');//if found emit shutdown command to through the socket                                
         flag=1;
         console.log('Element found!!!');    
            
        }
    }
    
    
    
    
});    
//for wake-on-lan send magic packet to the specified mac address    
socket.on('wakeup',function(content){
wol.wake(content,function(err){
        if(err)
                {
                    console.log(err);
                }
        else
        {
            console.log("Magic Packet sent successfully!!!");
            
        }
    
        });    

    });    
});
http.on('listening',function(){
console.log('server created!!!');    
});
