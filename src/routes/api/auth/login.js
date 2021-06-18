import stall from '../_stall';
import { BadRequestError } from '$lib/errors';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async () => {
	// Wait for 2 secs to simulate a long request
	await stall(2000);

	throw new BadRequestError('INVALID_EMAIL_OR_PASSWORD');
};
