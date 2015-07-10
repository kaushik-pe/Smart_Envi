var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');
httpd.listen(4000,"192.168.1.172");
var clients=[];
function handler(req, res) {
fs.readFile(__dirname + '/index.html',
function(err, data) {
if (err) {
res.writeHead(500);
return res.end('Error loading index.html');
}
res.writeHead(200);
res.end(data);
}
);
}
io.sockets.on('connection', function (socket) {
    clients.push(socket);
    socket.name="Client "+clients.length;            
    socket.on('clientMessage', function(content) {
            socket.emit('serverMessage', 'You said: ' + content);
            socket.broadcast.emit('serverMessage', socket.name + ' said: ' +content);
      
        
            });
     socket.on("setname" , function(content){
       socket.name=content; 
       socket.broadcast.emit('serverMessage', socket.name + ' has logged in!!');    
        socket.emit('You have logged in as'+socket.name); 
        
        
    });
        
});