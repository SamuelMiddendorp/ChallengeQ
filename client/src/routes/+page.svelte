<script lang="ts">
    import { onMount } from "svelte";
    import type { QuestionRequest } from "../lib/contract";
    import { questionStore, sendAnswer, sendUserName } from "../stores/PlayerWebSocketStore";

	let userName: string;
	let userNameSet = false;
	let question: QuestionRequest
	let currentAnswer: string;
	onMount(() => {
		questionStore.subscribe(questionResponse => {
			question = questionResponse;
		})
	})
	
	const onSendMessage = () => {
		sendUserName(userName);
		userNameSet = true;
	}
	const onAnswerQuestion = () => {
		if(currentAnswer){
			sendAnswer(currentAnswer);
		}
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
		<div class="answers">
		{#each Object.entries(question.answers) as [answerSecret, answer]}
			<button class:active="{currentAnswer === answerSecret}" on:click={() => currentAnswer = answerSecret}>{answer}</button>
		{/each}
		</div>
		<button class="submit" on:click={() => onAnswerQuestion()}>Submit</button> 
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
		background-color: #160032;
	}
	.question{
		border-radius: 1rem;
		padding: 1rem;
		color: #efefef;
		background-color: #40008e;
	}
	.question button{
		transition: all 0.2s ease-in-out;
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
	.question button:hover{
		background-color: #ad6aff !important;
	}
	.submit{
		text-transform: uppercase;
		text-align: center !important;
		margin-top: 2rem !important;
	}
	.active{
		background-color: #ad6aff !important;
	}
</style>