import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer, WebSocket } from "ws";
import { readQuestionSetFromFile } from './utils';

const playersWss = new WebSocketServer({
	port: 3000
});

const dashboardWss = new WebSocketServer({
	port: 3001
});
const questionSet = readQuestionSetFromFile("./questionSets/dotnet.json");
console.log(questionSet);
const userMap = new Map(); 
const playerStates: any = {}

playersWss.on('connection', function connection(ws) {

	let userId = uuidv4();
	playerStates[userId] = [];

	ws.onmessage = (message: any) => {
		let data = JSON.parse(message.data);
		console.log(message.data);
		userMap.set(userId, data.userId)
		if(playerStates[userMap.get(userId)] == null){
			playerStates[userMap.get(userId)] = [];
		}
		playerStates[userMap.get(userId)] = [...playerStates[userMap.get(userId)], data.message] 

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
dashboardWss.on('connection', function connection(ws){
	ws.send(JSON.stringify(playerStates));
})
const updateDashboard = (playerStates: any) => {
	dashboardWss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(playerStates));
		}
	})

}