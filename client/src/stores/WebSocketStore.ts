import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export interface Message{
    userId: string,
    message: string
}
export const messageStore: Writable<Message> = writable({userId: '', message: ''});
export let sendMessage = (message: string) => { };

// Connect locally only if store is in browser
    const socket = browser ? new WebSocket('ws://localhost:3000') : null;

    socket?.addEventListener('open', function (event) {
        console.log("It's open");
    });

    socket?.addEventListener('message', function (event) {
        console.log("Message received")
        let data = JSON.parse(event.data);
        console.log(data);
        messageStore.set({userId: data.id, message: data.message});
    });
    sendMessage = (message: string) => {
        if (socket!.readyState <= 1) {
            socket?.send(message);
        }
    }

