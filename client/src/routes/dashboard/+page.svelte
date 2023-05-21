<script lang="ts">
    import { onMount } from "svelte";
    import { dashBoardStore } from "../../stores/DashboardWebSocketStore";
    import { fade } from "svelte/transition";
    import type { Scoreboard } from "../../lib/contract";
    let playerData: Scoreboard;

    onMount(() => {
        dashBoardStore.subscribe((currentData) => {
            console.log(currentData);
            playerData = currentData;
        });
    });
</script>

<div class="message-container">
    {#if playerData}
        {#each playerData.players as player}
                <div class="message" in:fade out:fade>
                    <h2>{player.username}</h2>
                    <h3>{player.points}</h3>
                </div>
        {/each}
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
    .message-container{
        font-family: 'Roboto', sans-serif;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    }
    .message{
        margin-top: 1rem;
        margin-left: 1rem;
        border-radius: 1rem;
        background-color: #efefef;
        padding: 1rem;
        max-width: 15rem;
    }
    
</style>
