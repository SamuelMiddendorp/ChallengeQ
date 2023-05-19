<script lang="ts">
    import { onMount } from "svelte";
    import { dashBoardStore } from "../../stores/DashboardWebSocketStore";
    import { fade } from "svelte/transition";
    let playerData: any = null;

    onMount(() => {
        dashBoardStore.subscribe((currentData) => {
            playerData = Object.entries(currentData);
            console.log(playerData);
        });
    });
</script>

<div class="message-container">
    {#if playerData}
        {#each playerData as [key, value]}
            {#each value as message}
                <div class="message" in:fade out:fade>
                    <h2>{key}</h2>
                    <h3>{message}</h3>
                </div>
            {/each}
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
