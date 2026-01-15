<script lang="ts">
    import Africa from "$lib/svgs/africa.svelte";
    import Asia from "$lib/svgs/asia.svelte";
    import Europe from "$lib/svgs/europe.svelte";
    import { allLocationsStore, selectedLocationStore } from "$lib/svgs/SelectionStore.svelte";
    import NorthAmerica from "$lib/svgs/north-america/north-america.svelte";
    import Oceania from "$lib/svgs/oceania.svelte";
    import SouthAmerica from "$lib/svgs/south-america.svelte";
    import { draggable } from "@neodrag/svelte";
    import { enhance } from "$app/forms";
    import { challengerInfo, getRegionBonuses } from "$lib/scoring";
    import { loadChallengeRecordsByChallenger } from "./data.remote";
    import { browser } from "$app/environment";
    import textimage from '$lib/assets/icons/text.png'
    import fromimage from '$lib/assets/icons/upload.png'
    import infoimage from '$lib/assets/icons/info.png'
    import failimage from '$lib/assets/icons/fail.png'
    let challengeExpand = $state(false);
    let scoresExpand = $state(false);
    let loading = $state("Submit");
    $effect(() => {
        if (!challengeExpand) loading = "Submit";
    });
    let scoreTab = $state("1181634705796378715");
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
    <div class="window" style:width="44ch" use:draggable={{ handle: ".title-bar", bounds: "parent" }}>
        <div class="title-bar">
            <div class="title-bar-text">Challenge</div>
            <div class="title-bar-controls">
                <button aria-label="Minimize" onclick={() => (challengeExpand = false)}></button>
                <button aria-label="Maximize" onclick={() => (challengeExpand = true)}></button>
            </div>
        </div>
        <div style:position="relative" style:padding="1em" style:display={challengeExpand ? "block" : "none"}>
            <form
                action=""
                style="display: flex; flex-direction: column; gap: 1em"
                use:enhance={() => {
                    loading = "Submitting...";
                    return async ({ update }) => {
                        await update();
                        loading = "Submitted!";
                    };
                }}
            >
                <h3 style:margin-block="0">{$allLocationsStore[$selectedLocationStore ?? ""]?.name}</h3>
                <div class="field-row-stacked">
                    <label for="timestamp"><img src={infoimage} alt="" width="32px" height="32px" style:margin-right="0.5ch" />Timestamp</label>
                    <input name="timestamp" type="date" />
                </div>
                <div class="field-row-stacked">
                    <label for="challenge-source"><img src={fromimage} height="32px" width="32px" alt="" />Challenging from</label>
                    <input name="challenge-source" type="search" placeholder="Use the abbreviated two-letter code..." />
                </div>
                <div class="field-row-stacked">
                    <label for="description"><img src={textimage} height="32px" width="32px" alt="" />Description</label>
                    <textarea id="description" rows="8" style:resize="vertical"></textarea>
                </div>
                <div class="field-row-stacked" style:flex-direction="row" style:align-content="center">
                    <img src={failimage} alt="" width="32px" height="32px" style:margin-right="0.5ch" style:padding-top="0.5em" />
                    <input type="checkbox" name="" id="success" />
                    <label for="success">Did you succeed?</label>
                </div>
                <input type="hidden" name="locationid" value={$selectedLocationStore} />
                <button type="submit" disabled={loading !== "Submit"}>{loading}</button>
            </form>
        </div>
    </div>
    <div class="window" use:draggable={{ handle: ".title-bar", bounds: "parent" }}>
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
                    {#each Object.entries(challengerInfo) as [id, challenger] (id)}
                        <button role="tab" onclick={() => (scoreTab = id)} aria-controls="tab-{id}">{challenger.name}</button>
                    {/each}
                </menu>
                {#each Object.entries(challengerInfo) as [id, challenger] (id)}
                    <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
                    <article role="tabpanel" style:display={scoreTab === id ? undefined : "none"} id="tab-{id}">
                        <img src={"https://tse4.mm.bing.net/th/id/OIP.MiyTaoyL4bgDzZSGG9-oaAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"} alt={challenger.name} style:filter="url(#pixelate)" class="pfp" />
                        <h3 style:margin-block="0">{challenger.name}</h3>
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
                                {#if browser}
                                    {#await loadChallengeRecordsByChallenger({ challengerid: id })}
                                        <tr>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                        </tr>
                                    {:then challengeRecords}
                                        {@const regionBonuses = getRegionBonuses(challengeRecords)}
                                        {#each challengeRecords as record}
                                            <tr>
                                                <td>{record.locationid}</td>
                                                <td><time datetime={record.timestamp.toISOString()}>{record.timestamp.toLocaleDateString("en-US", { day: "numeric", month: "long" })}</time></td>
                                                <td>{record.success ? "1" : "0"}</td>
                                            </tr>
                                        {/each}
                                        {#each regionBonuses as regionBonus}
                                            <tr>
                                                <td>{regionBonus.label}</td>
                                                <td></td>
                                                <td>{regionBonus.value}</td>
                                            </tr>
                                        {/each}
                                    {/await}
                                {/if}
                            </tbody>
                        </table>
                    </article>
                {/each}
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
