var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 

var whoonline = require('who-online');

var options=
{
	timer:5000,
	refresh:10000,
	port:4200,
	server_key:"my_key_server"
}

whoonline.Config(options);
whoonline.Run();

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
app.get('/server', function(req, res,next) {  
    res.sendFile(__dirname + '/server.html');
});
console.log("aperta");
server.listen(4201); 