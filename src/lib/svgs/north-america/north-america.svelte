<script>
   import RawState from "./RawState.svelte";
   import { NAStatePaths } from "./StateStore.svelte";
</script>

<svg viewBox="0 0 1391.4 1623.6">
   {#each NAStatePaths as state}
      <RawState id={state.id} />
   {/each}
</svg>
