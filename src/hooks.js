import { UserFacingError } from '$lib/errors';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	try {
		return await resolve(request);
	} catch (error) {
		if (error instanceof UserFacingError) {
			return {
				status: error.status,
				body: JSON.stringify({ code: error.code }),
				headers: { 'content-type': 'application/json' }
			};
		}

		return {
			status: 500,
			body: JSON.stringify({ code: 'ERROR' }),
			headers: { 'content-type': 'application/json' }
		};
	}
}
