import stall from '../_stall';

const users = [
	{
		id: 1,
		first_name: 'Mickey',
		last_name: 'Mouse'
	},
	{
		id: 2,
		first_name: 'Tony',
		last_name: 'Stark'
	}
];

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async () => {
	// Wait for 2 secs to simulate a long request
	await stall(2000);

	return { body: users };
};
