<script lang="ts">
    import { onMount } from "svelte";
    import { messageStore, sendMessage, type Message } from "../stores/WebSocketStore";

    let message: string;
	let userName: string;
	let messages: Message[] = [];

	onMount(() => {
		messageStore.subscribe(currentMessage => {
				messages = [...messages, currentMessage];
		})
	})
	
	function onSendMessage() {
		 if (message.length > 0) {
			 sendMessage({message: message, userId: userName});
			 message = "";
		 }
	}
</script>
<body>
<input type="text" bind:value={userName} />
<input type="text" bind:value={message} />
<button on:click={onSendMessage}>
	Send Message
</button>
{#each messages as message}
    <h2>{message.userId}</h2>
	<p>{message.message}</p>

{/each}
</body>