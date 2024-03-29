var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({ port: 4321 });
var sockets = [];

function removeSocket(socket) {
	sockets.splice(sockets.indexOf(socket), 1);
}

wss.on('connection', function(ws) {
	ws.on('error', function(error) {
		removeSocket(ws);
	});
	ws.on('close', function() {
		removeSocket(ws);
	});
	sockets.push(ws);
});

setInterval(function() {
	var numSockets = sockets.length;
	var randomNum = Math.floor(Math.random() * 100); // integer between 0 and 100 inclusive
	for (var i = 0; i < numSockets; i++) {
		sockets[i].send(randomNum.toString());
	}
}, 1000);
