import { browser } from '$app/environment';
import { writable } from 'svelte/store';


export const messageStore = writable('');
export let sendMessage = (message: string) => { };

// Connect locally only if store is in browser
    const socket = browser ? new WebSocket('ws://localhost:3000') : null;

    socket?.addEventListener('open', function (event) {
        console.log("It's open");
    });

    socket?.addEventListener('message', function (event) {
        messageStore.set(event.data);
    });
    sendMessage = (message: string) => {
        if (socket!.readyState <= 1) {
            socket?.send(message);
        }
    }

