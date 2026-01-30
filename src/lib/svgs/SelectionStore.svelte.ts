import type { SlimChallengeRecord } from "$lib";
import { readable, writable } from "svelte/store";

export const allLocations: { id: string; name: string; group: GroupKeys; adjacentids: string[]; area: number;}[] = [
    { id: "AFR", name: 'Africa', group: 'INTER', adjacentids: [], area: 0 },
    { id: "ASI", name: 'Asia', group: 'INTER', adjacentids: [], area: 0 },
    { id: "OCE", name: 'Oceania', group: 'INTER', adjacentids: [], area: 0 },
    { id: "EUR", name: 'Europe', group: 'INTER', adjacentids: [], area: 0 },
    { id: "SAM", name: 'South America', group: 'INTER', adjacentids: [], area: 0 },
    { id: "MX", name: "Mexico", group: 'TEXAS', adjacentids: ["CA", "AZ", "NM", "TX"], area: 0},
    //TODO: Add Antarctica.svelte file and svg
    //TODO: Add Central America (Guatemala south through Panama) to Mexico svg - remove from South America svg
    { id: "CR", name: "Caribbean", group: 'TEXAS', adjacentids: [], area: 0},
    //TODO: Add Caribbean svg
    { id: "QC", name: "Québec", group: 'NORTH', adjacentids: ["ON", "NL", "NB", "ME", "NH", "VT", "NY"], area: 0 },
    { id: "BC", name: "British Columbia", group: 'TERR', adjacentids: ["AK", "NT", "AB", "YT", "MT", "ID", "WA"], area: 0 },
    //TODO:  MB and ON are combined into one "Manitoba and Ontario" state
    { id: "MB", name: "Manitoba", group: 'LAKES', adjacentids: ["SK", "NU", "ON", "MN", "ND"], area: 0 },
    { id: "ON", name: "Ontario", group: 'LAKES', adjacentids: ["MB", "QC", "NY", "MI", "WI", "MN"], area: 0 },
    //TODO:  SK and AB are combined into one "Plains Canada" state
    { id: "SK", name: "Saskatchewan", group: 'PLAINS', adjacentids: ["AB", "NT", "MB", "ND", "MT"], area: 0 },
    { id: "AB", name: "Alberta", group: 'PLAINS', adjacentids: ["BC", "NT", "SK", "MT"], area: 0 },
    //TODO:  Next 3 states (NU, NT, YT) are combined into one "Canadian Territories" state
    { id: "NU", name: "Nunavut", group: 'TERR', adjacentids: ["MB", "NT"], area: 0 },
    { id: "NT", name: "Northwest Territories", group: 'TERR', adjacentids: ["NU", "SK", "AB", "BC", "YT"], area: 0 },
    { id: "YT", name: "Yukon", group: 'TERR', adjacentids: ["AK", "BC", "YT"], area: 0 },
    //TODO:  Next 5 states (NB, NS, NL, PE, GL) are combined into one "Atlantic Canada" state
    { id: "NB", name: "New Brunswick", group: 'NORTH', adjacentids: ["PE", "NS", "ME", "QC"], area: 0 },
    { id: "NS", name: "Nova Scotia", group: 'NORTH', adjacentids: ["NB"], area: 0 },
    { id: "NL", name: "Newfoundland and Labrador", group: 'NORTH', adjacentids: ["QC"], area: 0 },
    { id: "PE", name: "Prince Edward Island", group: 'NORTH', adjacentids: ["NB"], area: 0 },
    { id: "GL", name: "Greenland", group: 'NORTH', adjacentids: [], area: 0},
    // TODO: Add Greenland svg
    { id: "MA", name: "Massachusetts", group: 'NORTH', adjacentids: ["NH", "VT", "NY", "CT", "RI"], area: 7800 },
    { id: "MN", name: "Minnesota", group: 'LAKES', adjacentids: ["MB", "ON", "WI", "IA", "ND", "SD"], area: 79627 },
    { id: "MT", name: "Montana", group: 'PLAINS', adjacentids: ["BC", "AB", "SK", "ID", "WY", "ND", "SD"], area: 145546 },
    { id: "ND", name: "North Dakota", group: 'PLAINS', adjacentids: ["SK", "MB", "MN", "SD", "MT"], area: 69001 },
    { id: "ID", name: "Idaho", group: 'TERR', adjacentids: ["BC", "WA", "OR", "NV", "UT", "WY", "MT"], area: 82643 },
    { id: "WA", name: "Washington", group: 'TERR', adjacentids: ["BC", "ID", "OR"], area: 66456 },
    { id: "AZ", name: "Arizona", group: 'TEXAS', adjacentids: ["CA", "NV", "UT", "NM"], area: 113594 },
    { id: "CA", name: "California", group: 'TERR', adjacentids: ["OR", "NV", "AZ"], area: 155779 },
    { id: "CO", name: "Colorado", group: 'PLAINS', adjacentids: ["UT", "WY", "NE", "KS", "OK", "NM"], area: 103642 },
    { id: "NV", name: "Nevada", group: 'TERR', adjacentids: ["OR", "ID", "UT", "AZ", "CA"], area: 109781 },
    { id: "NM", name: "New Mexico", group: 'TEXAS', adjacentids: ["AZ", "CO", "OK", "TX"], area: 121298 },
    { id: "OR", name: "Oregon", group: 'TERR', adjacentids: ["WA", "ID", "NV", "CA"], area: 95988 },
    { id: "UT", name: "Utah", group: 'PLAINS', adjacentids: ["ID", "WY", "CO", "NV", "AZ"], area: 82170 },
    { id: "WY", name: "Wyoming", group: 'PLAINS', adjacentids: ["ID", "MT", "NE", "SD", "CO", "UT"], area: 97093 },
    { id: "AR", name: "Arkansas", group: 'TEXAS', adjacentids: ["OK", "MO", "TN", "MS", "LA", "TX"], area: 52035 },
    { id: "IA", name: "Iowa", group: 'LAKES', adjacentids: ["SD", "MN", "WI", "IL", "MO", "NE"], area: 55857 },
    { id: "KS", name: "Kansas", group: 'PLAINS', adjacentids: ["CO", "NE", "MO", "OK"], area: 81759 },
    { id: "MO", name: "Missouri", group: 'LAKES', adjacentids: ["NE", "KS", "IA", "IL", "KY", "TN", "AR", "OK"], area: 68742 },
    { id: "NE", name: "Nebraska", group: 'PLAINS', adjacentids: ["WY", "SD", "ID", "MO", "KS", "CO"], area: 76824 },
    { id: "OK", name: "Oklahoma", group: 'TEXAS', adjacentids: ["CO", "KS", "MO", "AR", "TX", "NM"], area: 68595 },
    { id: "SD", name: "South Dakota", group: 'PLAINS', adjacentids: ["MT", "ND", "MN", "IA", "NE", "WY"], area: 75811 },
    { id: "LA", name: "Louisiana", group: 'TEXAS', adjacentids: ["TX", "AR", "MS"], area: 43204 },
    { id: "TX", name: "Texas", group: 'TEXAS', adjacentids: ["NM", "OK", "AR", "LA"], area: 261232 },
    { id: "CT", name: "Connecticut", group: 'NORTH', adjacentids: ["NY", "MA", "RI"], area: 4842 },
    { id: "NH", name: "New Hampshire", group: 'NORTH', adjacentids: ["VT", "QC", "ME", "MA"], area: 8953 },
    { id: "RI", name: "Rhode Island", group: 'NORTH', adjacentids: ["MA", "CT"], area: 1034 },
    { id: "VT", name: "Vermont", group: 'NORTH', adjacentids: ["NY", "QC", "NH", "MA"], area: 9217 },
    { id: "AL", name: "Alabama", group: 'SOUTH', adjacentids: ["MS", "TN", "GA", "FL"], area: 50645 },
    { id: "FL", name: "Florida", group: 'SOUTH', adjacentids: ["AL", "GA"], area: 53625 },
    { id: "GA", name: "Georgia", group: 'SOUTH', adjacentids: ["AL", "TN", "NC", "SC", "FL"], area: 57513 },
    { id: "MS", name: "Mississippi", group: 'SOUTH', adjacentids: ["LA", "AR", "TN", "AL"], area: 46923 },
    { id: "SC", name: "South Carolina", group: 'SOUTH', adjacentids: ["NC", "GA"], area: 30061 },
    { id: "IL", name: "Illinois", group: 'LAKES', adjacentids: ["IA", "WI", "IN", "KY", "MO"], area: 55519 },
    { id: "IN", name: "Indiana", group: 'LAKES', adjacentids: ["IL", "MI", "OH", "KY"], area: 35826 },
    { id: "KY", name: "Kentucky", group: 'SOUTH', adjacentids: ["IL", "IN", "OH", "WV", "VA", "TN", "MO"], area: 39486 },
    { id: "NC", name: "North Carolina", group: 'SOUTH', adjacentids: ["VA", "SC", "GA", "TN"], area: 48618 },
    { id: "OH", name: "Ohio", group: 'LAKES', adjacentids: ["IN", "MI", "PA", "WV", "KY"], area: 40861 },
    { id: "TN", name: "Tennessee", group: 'SOUTH', adjacentids: ["MO", "KY", "VA", "NC", "GA", "AL", "MS", "AR"], area: 41235 },
    { id: "VA", name: "Virginia", group: 'URBIA', adjacentids: ["WV", "MD", "DC", "NC", "TN", "KY"], area: 39490 },
    { id: "WI", name: "Wisconsin", group: 'LAKES', adjacentids: ["MN", "MI", "IA", "IL"], area: 54158 },
    { id: "WV", name: "West Virginia", group: 'URBIA', adjacentids: ["OH", "PA", "WV", "VA", "KY"], area: 24038 },
    { id: "DE", name: "Delaware", group: 'URBIA', adjacentids: ["MD", "PA", "NJ"], area: 6446 },
    { id: "DC", name: "District of Columbia", group: 'URBIA', adjacentids: ["MD", "VA"], area: 68 },
    { id: "MD", name: "Maryland", group: 'URBIA', adjacentids: ["PA", "DE", "VA", "WV"], area: 9707 },
    { id: "NJ", name: "New Jersey", group: 'URBIA', adjacentids: ["NY", "PA", "DE"], area: 7354 },
    { id: "NY", name: "New York", group: 'URBIA', adjacentids: ["ON", "QC", "VT", "MA", "CT", "NJ", "PA"], area: 47126 },
    { id: "PA", name: "Pennsylvania", group: 'URBIA', adjacentids: ["NY", "NJ", "MD", "DE", "WV", "OH"], area: 44743 },
    { id: "ME", name: "Maine", group: 'NORTH', adjacentids: ["NH", "QC", "NB"], area: 30843 },
    { id: "MI", name: "Michigan", group: 'LAKES', adjacentids: ["WI", "ON", "OH", "IN", "IL"], area: 56539 },
    { id: "AK", name: "Alaska", group: 'TERR', adjacentids: ["YT", "BC"], area: 570641 },
    { id: "HI", name: "Hawaii", group: 'TERR', adjacentids: [], area: 6423 },
];
export const allLocationsStore = readable(Object.fromEntries(allLocations.map((loc) => [loc.id, loc])));
export const selectedLocationStore = writable<string | undefined>("AFR");
export type GroupKeys = 'NORTH' | 'SOUTH' | 'LAKES' | 'TEXAS' | 'URBIA' | 'TERR' | 'INTER' | 'PLAINS';
export const groups: Record<GroupKeys, { color: string, label: string; }> = {
    'NORTH': {
        // color: '#1982c4',
        color: "#dddddd",
        label: 'New England',
    },
    'SOUTH': {
        // color: '#ff595e',
        color: "#dddddd",
        label: 'Southeast',
    },
    'LAKES': {
        // color: '#8ac926',
        color: "#dddddd",
        label: 'Great Lakes',
    },
    'TEXAS': {
        // color: '#52a675',
        color: "#dddddd",
        label: 'Southwest',
    },
    'URBIA': {
        // color: '#c5ca30',
        color: "#dddddd",
        label: 'Mid-Atlantic',
    },
    'TERR': {
        // color: '#ff924c',
        color: "#dddddd",
        label: 'Frontier',
    },
    'INTER': {
        // color: '#6a4c93',
        color: "#dddddd",
        label: 'International',
    },
    'PLAINS': {
        // color: '#ffca3a',
        color: "#dddddd",
        label: 'Mountains/Plains'
    }
};