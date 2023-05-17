const { v4: uuidv4 } = require('uuid');
import { WebSocketServer, WebSocket } from "ws";

const playersWss = new WebSocketServer({
	port: 3000
});

const dashboardWss = new WebSocketServer({
	port: 3001
});

const userMap = new Map(); 
const playerStates: any = {};

playersWss.on('connection', function connection(ws) {

	let userId = uuidv4();
	playerStates[userId] = [];

	ws.onmessage = (message: any) => {
		let data = JSON.parse(message.data);
		console.log(message.data);
		userMap.set(userId, data.userId)
		playerStates[userId] = [...playerStates[userId], data.message] 

		updateDashboard(playerStates);
	};
});

const updatePlayers = (message: string, id: string) => {
	playersWss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({message: message, id: id}));
		}
	});
};
const updateDashboard = (playerStates: any) => {
	dashboardWss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(playerStates));
		}
	})

}