<script lang="ts">
    import { onMount } from "svelte";
    import { dashBoardStore } from "../../stores/DashboardWebSocketStore";

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
        <div>
            <h1>
                {key}
            </h1>
            {#each value as message}
                <h3>{message}</h3>
            {/each}
        </div>
    {/each}
    {/if}
</body>
