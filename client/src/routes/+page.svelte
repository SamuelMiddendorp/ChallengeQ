<script lang="ts">
    import { onMount } from "svelte";
    import type { QuestionRequest } from "../lib/contract";
    import { questionStore, sendUserName } from "../stores/PlayerWebSocketStore";

	let userName: string;
	let question: QuestionRequest
	onMount(() => {
		questionStore.subscribe(question=> {
			question = question;
		})
	})
	
	function onSendMessage() {
		sendUserName(userName);
	}
</script>
<body>
<input type="text" bind:value={userName} />
<button on:click={onSendMessage}>
	Join!
</button>
{#if question}
{question.name}
{/if}
</body>