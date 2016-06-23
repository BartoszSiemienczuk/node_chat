var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
	res.sendfile(__dirname+"/index.html");
});

io.on("connection", function(client){
	client.emit("annoucement", "Hello to Chat!");
	
	client.on("message", function(data){
		console.log("Message is through!");
		console.log(data);
		
		client.emit("message", data);
		client.broadcast.emit("message", data);
	});
});

http.listen(8080, function(){
	console.log("Node server running.");
});