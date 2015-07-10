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
                    process(str);
                    if(str=='l'){
                        sockets.forEach(function(othr){
                        if(othr !== socket)
                            {
                               othr.write("logoff");
                            }

                         });
                    }
                     if(str=='r'){
                        sockets.forEach(function(othr){
                        if(othr !== socket)
                            {
                                othr.write("restart");
                            }

                         });
                    }
                     if(str=='s'){
                        sockets.forEach(function(othr){
                        if(othr !== socket)
                            {
                                othr.write("shutdown");
                            }

                         });
                    }
                        var str = data.toString();
                        console.log(str);
                        if(str.search('ip')!==-1)
                        {
                            save_ip(str);
                        }
                        show_all_ip();

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
    var str=ip_raw.replace("ip","");
    ip.push(str);
}
function process(str1)
{
        if(str1.search('ip')!==-1)
                        {
                            save_ip(str1);
                        }
        if(str1.search('shutdown')!=1)
        {
                off_sys(str1);
        }

}
function off_sys(str2)
{

        var sub=str2.replace("shutdown","");
        console.log(sub);


}
