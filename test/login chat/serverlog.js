var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');
httpd.listen(3333,'192.168.1.141');                  //listening to port 3333


function handler(req, res) {
 fs.readFile(__dirname + '/indexlog.html',             //displaying html file in server
 function(err, data) {
 if (err) {
 res.writeHead(500);
 return res.end('Error loading index.html');        //throws error is html file is not read
 }
 res.writeHead(200);
 res.end(data);
 });
}
io.sockets.on('connection', function (socket) {         //establishing socket connection
 socket.on('clientMessage', function(content) {         //receiving client message
 socket.emit('serverMessage', 'You said: ' + content);  //emitting to the respective client
 socket.broadcast.emit('serverMessage', socket.name+ ' said: ' + content);    //emitting data to all clients
 });
socket.on('login', function(username) {
  socket.name=username;
 socket.emit('serverMessage', 'WELCOME :' + socket.name);
 socket.broadcast.emit('serverMessage', 'NEW USER:' +socket.name);
 });
 socket.emit('login');
 });
