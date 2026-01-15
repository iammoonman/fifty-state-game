import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { getCurrentStateOwnership, putChallengeRecord } from "$lib/mongo";
import { challengerInfo } from "$lib/scoring";
import { allLocations } from "$lib/svgs/SelectionStore.svelte";

export async function load({ locals }) {
	return { stateRecords: await getCurrentStateOwnership(), session: locals.auth ? await locals.auth() : null };
}

export const actions: Actions = {
	challenge: async ({ request, locals }) => {
		const session = locals.auth ? await locals.auth() : null;
		if (session === null) return fail(401);
		if (!session.user?.id) return fail(401);
		if (!Object.keys(challengerInfo).includes(session.user!.id)) return fail(401);
		const data = await request.formData();
		const sourcelocationid = data.get("challenge-source") as string;
		if (!allLocations.map((l) => l.id).includes(sourcelocationid)) return fail(401);
		const timestampString = data.get("timestamp") as string;
		const timestamp = new Date(timestampString);
		const description = data.get("description") as string;
		const successString = data.get("success") as string;
		const success = successString === 'true';
		const locationid = data.get("locationid") as string;
		if (!allLocations.map((l) => l.id).includes(locationid)) return fail(401);
		await putChallengeRecord({ challengerid: session.user.id, challengemeta: {}, description, locationid, sourcelocationid, success, timestamp });
	}
};