import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer, WebSocket } from "ws";
import { AnswerResponse, UserDetailsResponse } from './contract';
import { mapToQuestionResponse, mapToScoreboard } from './mappers';
import { PlayerState } from './model';
import { matchResponse, readQuestionSetFromFile } from './utils';

const playersWss = new WebSocketServer({
	port: 3000
});

const dashboardWss = new WebSocketServer({
	port: 3001
});
const questionSet = readQuestionSetFromFile("./questionSets/dotnet.json");

const playerStates: Map<string, PlayerState> = new Map();

playersWss.on('connection', function connection(ws) {

	let userId = uuidv4();
	playerStates.set(userId, {
		usernameSet: false,
		username: "",
		points: 0,
		currentQuestion: 0
	})

	ws.onmessage = (message: any) => {
		console.log(message);
		let currentPlayerState = playerStates.get(userId)!;
		let data: AnswerResponse | UserDetailsResponse = JSON.parse(message.data);
		matchResponse(data,
			(response: AnswerResponse) => {
				console.log(response);
			},
			(response: UserDetailsResponse) => {
				currentPlayerState.username = response.username;
				currentPlayerState.usernameSet = true;
				playerStates.set(userId, currentPlayerState);
				ws.send(JSON.stringify(mapToQuestionResponse(questionSet.questions[0])));
			});

		updateDashboard();
	};
});
dashboardWss.on('connection', function connection(ws) {
	ws.send(JSON.stringify(mapToScoreboard(playerStates)));
})
const updateDashboard = () => {
	dashboardWss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(mapToScoreboard(playerStates)));
		}
	})

}