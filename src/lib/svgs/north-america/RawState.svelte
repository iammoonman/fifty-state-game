<script lang="ts">
    import { allLocationsStore, groups, selectedLocationStore } from "../SelectionStore.svelte";
    import { NAStatePathStore } from "./StateStore.svelte";
    import { page } from "$app/state";
    import { challengerInfo } from "$lib/scoring";

    let { id, pathElement = $bindable<SVGPathElement>(), ...rest } = $props();
    export function getBBox() {
        return `${pathElement?.getBBox().x} ${pathElement?.getBBox().y} ${pathElement?.getBBox().width} ${pathElement?.getBBox().height}`;
    }
    export function getRawBBox() {
        return pathElement?.getBBox();
    }
    // If a user has claimed this state, put their pfp in the middle of the path.
</script>

<!-- {#await page.data.stateRecords then records}  -->
    <!-- {@const thisRecord = records.find((s) => s.locationid === id)} -->
    <!-- {#if thisRecord} -->
        <!-- Whatever the SVG image thing is, IDK -->
        <!-- {challengerInfo[thisRecord.challengerid].pfp} -->
        <!-- getRawBBox().x + getRawBBox().width / 2 -->
        <!-- getRawBBox().y + getRawBBox().height / 2 -->
    <!-- {/if} -->
<!-- {/await} -->
<path class:saturated={$selectedLocationStore === id} onclick={() => selectedLocationStore.set(id)} onkeydown={() => selectedLocationStore.set(id)} bind:this={pathElement} d={$NAStatePathStore[id].d} fill={groups[$allLocationsStore[id].group].color} {...rest} />

<style>
    path {
        cursor: pointer;
        stroke-width: 1px;
        stroke: currentColor;
    }
    .saturated {
        filter: saturate(0.3);
    }
</style>
