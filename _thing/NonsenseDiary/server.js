////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// SERVER
var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);
var port = process.env.PORT || 8000;

var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

app.get('*', function(req, res){
	res.sendFile(__dirname + req.url);
});

//
server.listen(port);
console.log('Server started on port ' + port);

// console.log(tokenizer.tokenize("your dog has fleas."));

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// WEBSOCKET
// using ws to talk to the client side, right?
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer( {'server': server} );


wss.on('connection', function(ws){

	ws.on('message', function(data){
		
		var msg = JSON.parse(data);
		socketHandlers(ws, msg);

	});

	ws.on('close', function(){
		
	});	
});

//
//
var socketHandlers = function(socket, msg){
	try{

		if(msg.type=='toExamine'){
			console.log('got text to examine! --> ' + msg.text);

			msg.type = 'afterExamined';
			msg.text = tokenizer.tokenize(msg.text);
		}

		// SERVER_SEND_GENERAL_THING
		socket.send(JSON.stringify(msg));
	}
	catch(error){
		console.log('that socket was closed');
	}
}
