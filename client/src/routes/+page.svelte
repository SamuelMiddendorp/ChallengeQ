<script lang="ts">
    import { onMount } from "svelte";
    import type { QuestionRequest } from "../lib/contract";
    import { questionStore, sendAnswer, sendUserName } from "../stores/PlayerWebSocketStore";
    import { fade } from "svelte/transition";

	let userName: string;
	let userNameSet = false;
	let question: QuestionRequest
	let answer: string;
	onMount(() => {
		questionStore.subscribe(questionResponse => {
			question = questionResponse;
		})
	})
	
	const onSendMessage = () => {
		sendUserName(userName);
		userNameSet = true;
	}
	const onAnswerQuestion = (answer: string) => {
		sendAnswer(answer);
	}
</script>
<body>
{#if !userNameSet}
<input type="text" bind:value={userName} />
<button on:click={onSendMessage}>
	Join!
</button>
{/if}
<!-- For now we render the question on the same page, WIP-->
{#if question}
<div class="question">
	{#key question.name}<h2>{question.name}</h2>{/key}
	<p>{question.description}</p>
	<ul>
		{#each Object.entries(question.answers) as [answerSecret, answer]}
			<button on:click={() => onAnswerQuestion(answerSecret)}>{answer}</button>
		{/each}
	</ul>
</div>
{/if}
</body>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
	*{
		margin: 0;
		padding: 0;
	}
	body{
		height: 100%;
		min-height: 95vh;
        font-family: 'Roboto', sans-serif;
		display: grid;
		place-content: center;
	}
	.question{
		border-radius: 0.4rem;
		padding: 1rem;
		color: #efefef;
		background-color: #111;	
	}
	.question button{
		display: block;
		text-align: left;
		width: 100%;
		padding: 0.4rem;
		color: #fff;
		font-size: 1.2rem;
		border: none;
		background-color: #7300ff;
		margin-top: 1rem;
		border-radius: 0.4rem;
	}
</style>