<script lang="ts">
    import { NAStatePathStore } from "./StateStore.svelte";

    let pathElement = $state<SVGPathElement | undefined>();
    let viewBox = $state(getBBox());
    $effect(() => {
        viewBox = `${pathElement?.getBBox().x} ${pathElement?.getBBox().y} ${pathElement?.getBBox().width} ${pathElement?.getBBox().height}`;
        if (id) return;
    });

    let { id, ...rest } = $props();
    let d = $derived($NAStatePathStore[id]?.d);
    export function getBBox() {
        return `${pathElement?.getBBox().x} ${pathElement?.getBBox().y} ${pathElement?.getBBox().width} ${pathElement?.getBBox().height}`;
    }
    export function getRawBBox() {
        return pathElement?.getBBox();
    }
</script>

<svg {viewBox}>
    <path bind:this={pathElement} data-id={id} {d} {...rest} />
</svg>

<style>
    svg {
        vertical-align: middle;
        display: inline-block;
    }
    path {
        fill: currentColor;
    }
</style>
