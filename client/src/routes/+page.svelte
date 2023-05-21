<script lang="ts">
    import { onMount } from "svelte";
    import type { QuestionRequest } from "../lib/contract";
    import { questionStore, sendUserName } from "../stores/PlayerWebSocketStore";

	let userName: string;
	let userNameSet = false;
	let question: QuestionRequest
	onMount(() => {
		questionStore.subscribe(questionResponse => {
			question = questionResponse;
		})
	})
	
	function onSendMessage() {
		sendUserName(userName);
		userNameSet = true;
	}
</script>
<body>
{#if !userNameSet}
<input type="text" bind:value={userName} />
<button on:click={onSendMessage}>
	Join!
</button>
{/if}
{#if question}
{question.name}
{/if}
</body>