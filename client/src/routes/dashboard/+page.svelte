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

<body>
    {#if playerData}
    {#each playerData as [key, value]}
        <div in:fade out:fade>
            <h1>
                {key}
            </h1>
            {#each value as message}
                <h3 in:fade>{message}</h3>
            {/each}
        </div>
    {/each}
    {/if}
</body>
