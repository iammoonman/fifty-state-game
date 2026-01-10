import { query } from "$app/server";
import { getChallengerRecords } from "$lib/mongo";
import { type } from "arktype";

export const loadChallengeRecordsByChallenger = query(type({ challengerid: 'string' }), async ({ challengerid }) => {
    return getChallengerRecords(challengerid);
});