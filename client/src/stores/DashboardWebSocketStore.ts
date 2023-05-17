import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';


export const dashBoardStore: Writable<any> = writable({});

// Connect locally only if store is in browser
const socket = browser ? new WebSocket('ws://localhost:3001') : null;

socket?.addEventListener('open', function (event) {
    console.log("Dashboard connected");
});

socket?.addEventListener('message', function (event) {
    let data = JSON.parse(event.data);
    dashBoardStore.set(data);
});

