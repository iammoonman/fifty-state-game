import type { ChallengeRecord } from "$lib";
import { allLocations, type GroupKeys } from "./svgs/SelectionStore.svelte";

export const challengerInfo = {
    '1181634705796378715': {
        pfp: '',
        color: '',
        name: 'Dan'
    },
    '231826005025751041': {
        pfp: '',
        color: '',
        name: 'Eli'
    },
    '393548209005527042': {
        pfp: '',
        color: '',
        name: 'Trevor'
    },
    '168164437864349696': {
        pfp: '',
        color: '',
        name: 'Rohin'
    },
    '695421324054495251': {
        pfp: '',
        color: '',
        name: 'Tim'
    },
    '310273941845311498': {
        pfp: '',
        color: '',
        name: 'John'
    }
};

export function getRegionBonuses(challengeRecords: ChallengeRecord[]): { label: string, value: number; }[] {
    return [...challengeRecords.reduce((set, record) => {
        let region = allLocations.find((loc) => record.locationid == loc.id)?.group;
        if (region) set.add(region);
        return set;
    }, new Set<GroupKeys>()).values().map((val) => ({ label: val, value: 0.5 }))];
}
// function getAreaBonus() {}
//  weird formula, scales with # of states claimed and number of players, decaying with number of players
//  B = 0.2 * (num of municipalities owned) * 0.75^(rank - 1) * (1 if rank is greater than ceil(players / 2), else 0)