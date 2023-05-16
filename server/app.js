const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({
	port: 3000
});


wss.on('connection', function connection(ws) {
	ws.id = uuidv4();
	ws.onmessage = (message) => {
		updateClients(message.data, ws.id);
	};
});

const updateClients = (message, id) => {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({message: message, id: id}));
		}
	});
};