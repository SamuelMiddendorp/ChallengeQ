import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';
import type { QuestionRequest } from '../lib/contract';

export const questionStore: Writable<QuestionRequest> = writable();

// Connect locally only if store is in browser
const socket = browser ? new WebSocket('ws://localhost:3000') : null;

socket?.addEventListener('open', function (event) {
    console.log("Connected to ChallengeQ");
});

socket?.addEventListener('message', function (event) {
    let data: QuestionRequest = JSON.parse(event.data);
    questionStore.set(data);
});

export const sendUserName = (username: string) => {
    if (socket!.readyState <= 1) {
        socket?.send(JSON.stringify({username: username}));
    }
}

export const sendAnswer = (answer: string) => {
    if (socket!.readyState <= 1) {
        socket?.send(JSON.stringify({answer: answer}));
    }
}
