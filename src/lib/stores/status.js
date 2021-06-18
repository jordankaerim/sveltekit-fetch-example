import { writable } from 'svelte/store';

const { subscribe, update } = writable({});

export default {
	subscribe,

	set(name, description) {
		update((obj) => {
			const _old = obj[name] || {};
			const _new = { ..._old, [description]: true };

			return { ...obj, [name]: _new };
		});
	},

	reset(name, description) {
		update((obj) => {
			const _old = obj[name] || {};
			const _new = description ? { ..._old, [description]: undefined } : { ...obj };

			return { ...obj, [name]: _new };
		});
	}
};
