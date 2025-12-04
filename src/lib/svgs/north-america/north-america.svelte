<script>
   import RawState from "./RawState.svelte";
   import { NAStatePaths } from "./StateStore.svelte";
</script>

<svg viewBox="0 0 773 902">
   {#each NAStatePaths as state}
      <RawState id={state.id} />
   {/each}
</svg>
