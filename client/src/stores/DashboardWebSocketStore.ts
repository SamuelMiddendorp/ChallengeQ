import { browser } from '$app/environment';
import type { Scoreboard } from '$lib/contract';
import { writable, type Writable } from 'svelte/store';


export const dashBoardStore: Writable<Scoreboard> = writable({players: []});

// Connect locally only if store is in browser
const socket = browser ? new WebSocket('ws://localhost:3001') : null;

socket?.addEventListener('open', function (event) {
    console.log("Dashboard connected");
});

socket?.addEventListener('message', function (event) {
    let data: Scoreboard = JSON.parse(event.data);
    console.log(data);
    dashBoardStore.set(data);
});

