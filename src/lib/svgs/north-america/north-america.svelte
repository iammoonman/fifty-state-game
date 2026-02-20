<script>
    import Alaska from "./Alaska.svelte";
    import BritishColumbia from "./BritishColumbia.svelte";
    import NorthernTerritories from "./NorthernTerritories.svelte";
   import RawState from "./RawState.svelte";
   import { NAStatePaths } from "./StateStore.svelte";
</script>

<svg viewBox="0 0 1391.4 1623.6" x="0" y="0" height="1000" width="1000">
   {#each NAStatePaths as state}
      <RawState id={state.id} />
   {/each}
   <NorthernTerritories />
   <Alaska />
   <BritishColumbia />
</svg>
