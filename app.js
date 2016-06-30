var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

//app.get('/', function(req, res){
//	res.sendFile(__dirname+"/index.html");
//});

io.on("connection", function(client){
	client.emit("annoucement", "Hello to Chat!");
	
	client.on("message", function(data){
		client.emit("message", data);
		client.broadcast.emit("message", data);
	});
});

http.listen(8080, function(){
	console.log("Node server running.");
});