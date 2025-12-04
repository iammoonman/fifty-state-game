import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
// import { getCurrentStateOwnership, putChallengeRecord } from "$lib/mongo";

// export async function load() {
// 	return { stateRecords: await getCurrentStateOwnership() };
// }

export const actions: Actions = {
	challenge: async ({ request, locals }) => {
		const session = locals.auth ? await locals.auth() : null;
		if (session === null) return fail(401);
		if (!session.user?.email) return fail(401);
		const data = await request.formData();
		const challenge = data.get("challenge") as string;
		const challengeParsed = JSON.parse(challenge);
		// await putChallengeRecord(challengeParsed);
	}
};