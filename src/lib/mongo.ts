import { AggregationCursor, FindCursor, MongoClient, type WithId } from "mongodb";
import { MONGO } from "$env/static/private";
import type { ChallengeRecord, SlimChallengeRecord } from "$lib";

const client = new MongoClient(MONGO);

export async function connect() {
	await client.connect();
}

export async function disconnect() {
	await client.close();
}

export function getDB() {
	return client.db("FiftyStateGame");
}

export function getCollection() {
	const db = getDB();
	return db.collection<ChallengeRecord>('ChallengeRecords');
}

/** Svelte is funny about POJOs, and mongo is also funny about POJOs. I'm laughing really hard at both of their jokes. */
async function clean<T>(cursor: FindCursor<WithId<T>> | AggregationCursor<WithId<T>>) {
	const response = await cursor.toArray();
	return response.map(({ _id, ...rest }) => rest) as T[];
}

/** Not sure if this works. */
export async function getCurrentStateOwnership() {
	const records = getCollection();
	const returnedRecords = records.aggregate<SlimChallengeRecord & { _id: any; }>([{ $match: { success: true } }, { $sort: { locationid: 1 } }, { $group: { _id: { locationid: '$locationid' }, challengerid: { $first: '$challengerid' }, challengemeta: { $first: '$challengemeta' } } }]);
	return (await returnedRecords.toArray()).map(({ _id, ...rest }) => rest);
}

export async function getLocationRecords(locationid: string) {
	const records = getCollection();
	const returnedRecords = records.find({ locationid });
	return clean(returnedRecords);
}

export async function getChallengerRecords(challengerid: string) {
	const records = getCollection();
	const returnedRecords = records.find({ challengerid });
	return clean(returnedRecords);
}

export async function putChallengeRecord(challenge: ChallengeRecord) {
	const records = getCollection();
	const response = records.insertOne(challenge);
	return response;
}
