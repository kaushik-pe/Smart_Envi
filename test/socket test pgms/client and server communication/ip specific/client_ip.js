var net = require('net');
var os = require('os');
var arr = [];
arr=os.networkInterfaces();
var exec = require('child_process').exec; 
var client = net.createConnection(3000,"192.168.1.172",function () {
console.log("Connected Succesfully with server!!!"); 
client.write("hello");
console.log(arr);    
client.write("ip"+arr.Ethernet[1].address);    
                });
client.on('data',function(data){
    var str=data.toString();
    if(str=="logoff")
    {
        client.end();
        exec("shutdown /l");
       
    }
    if(str=="restart")
    {
        client.end();
        exec("shutdown /r");
    }
    if(str=="shutdown")
    {
        client.end();
        exec("shutdown /s");
    }
  
});