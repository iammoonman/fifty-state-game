<script lang="ts">
    import Africa from "$lib/svgs/africa.svelte";
    import Asia from "$lib/svgs/asia.svelte";
    import Europe from "$lib/svgs/europe.svelte";
    import { allLocationsStore, selectedLocationStore } from "$lib/svgs/SelectionStore.svelte";
    import NorthAmerica from "$lib/svgs/north-america/north-america.svelte";
    import Oceania from "$lib/svgs/oceania.svelte";
    import SouthAmerica from "$lib/svgs/south-america.svelte";
    import { draggable } from "@neodrag/svelte";
    let challengeExpand = $state(true);
    let scoresExpand = $state(true);
</script>

<svg viewBox="50 200 700 200">
    <NorthAmerica />
    <!-- TODO: Come up with fun color(s) for these that aren't already used. -->
    <Europe height="150" width="150" role="button" tabindex="0" onkeypress={() => selectedLocationStore.set("EUR")} onclick={() => selectedLocationStore.set("EUR")} />
    <Asia height="100" width="100" role="button" tabindex="0" onkeypress={() => selectedLocationStore.set("ASI")} onclick={() => selectedLocationStore.set("ASI")} />
    <Africa height="100" width="100" role="button" tabindex="0" onkeypress={() => selectedLocationStore.set("AFR")} onclick={() => selectedLocationStore.set("AFR")} />
    <Oceania height="100" width="100" role="button" tabindex="0" onkeypress={() => selectedLocationStore.set("OCE")} onclick={() => selectedLocationStore.set("OCE")} />
    <SouthAmerica height="100" width="100" role="button" tabindex="0" onkeypress={() => selectedLocationStore.set("SAM")} onclick={() => selectedLocationStore.set("SAM")} />
</svg>
<div class="parent">
    <div class="window" style:width="44ch" use:draggable={{ handle: ".title-bar", bounds: "parent", position: { x:1127, y: 243 } }}>
        <div class="title-bar">
            <div class="title-bar-text">Challenge</div>
            <div class="title-bar-controls">
                <button aria-label="Minimize" onclick={() => (challengeExpand = false)}></button>
                <button aria-label="Maximize" onclick={() => (challengeExpand = true)}></button>
            </div>
        </div>
        <div style:position="relative" style:padding="1em" style:display={challengeExpand ? "block" : "none"}>
            <form action="" style="display: flex; flex-direction: column; gap: 1em">
                <h3 style:margin-block="0">{$allLocationsStore[$selectedLocationStore ?? ""]?.name}</h3>
                <div class="field-row-stacked">
                    <label for="timestamp">Timestamp</label>
                    <input name="timestamp" type="date" />
                </div>
                <div class="field-row-stacked">
                    <label for="challenge-source">Challenging from</label>
                    <input name="challenge-source" type="search" />
                </div>
                <div class="field-row-stacked">
                    <label for="description">Description</label>
                    <textarea id="description" rows="8" style:resize="vertical"></textarea>
                </div>
                <div class="field-row-stacked">
                    <input type="checkbox" name="" id="success" />
                    <label for="success">Did you succeed?</label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    <div class="window" use:draggable={{ handle: ".title-bar", bounds: "parent", position: { x: 905, y: 28 } }}>
        <div class="title-bar">
            <div class="title-bar-text">Scores</div>
            <div class="title-bar-controls">
                <button aria-label="Minimize" onclick={() => (scoresExpand = false)}></button>
                <button aria-label="Maximize" onclick={() => (scoresExpand = true)}></button>
            </div>
        </div>
        <div style:position="relative" style:padding="1em" style:display={scoresExpand ? "block" : "none"}>
            <section class="tabs" style="width: 500px">
                <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
                <menu role="tablist" aria-label="Sample Tabs">
                    <!-- I feel pretty confident about hardcoding each of us playing. -->
                    <!-- I just know that grabbing the pfps is going to suck. Might just use the XP user images instead lmao. -->
                    <button role="tab" aria-selected="true" aria-controls="tab-A">Tab A</button>
                </menu>
                <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
                <article role="tabpanel" id="tab-A">
                    <img src="https://tse4.mm.bing.net/th/id/OIP.MiyTaoyL4bgDzZSGG9-oaAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" style:filter="url(#pixelate)" class="pfp" />
                    <h3 style:margin-block="0">Username</h3>
                    <!-- Compare getChallengeRecords and getCurrentStateOwnership to calculate which rows add points. -->
                    <!-- Again, not sure how the points add up right now. -->
                    <table style:table-layout="fixed" style:text-align="left">
                        <thead>
                            <tr>
                                <th style:width="12ch">Location</th>
                                <th style:width="12ch">Timestamp</th>
                                <th style:width="12ch">Score gained</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Alaska</td>
                                <td><time datetime="">Dec 01, 2025</time></td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </section>
        </div>
    </div>
</div>

<style>
    svg {
        aspect-ratio: 1 / 1;
        height: 100vmin;
    }
    div.parent {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
    }
    div.window {
        z-index: 1;
        width: fit-content;
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: auto;
    }
    .title-bar-text {
        user-select: none;
    }
    .pfp {
        height: 5em;
        width: 5em;
        float: right;
    }
</style>
