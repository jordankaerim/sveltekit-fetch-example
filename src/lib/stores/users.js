import Api from '../Api';
import { writable } from 'svelte/store';
import { notifications } from '../Notifications.svelte';

const api = new Api('users');

const { subscribe, update } = writable([]);

export default {
	subscribe,

	async all() {
		const { data: users, error } = await api.get('fetching', '/users');

		notifications.success('FETCHED');

		return error || update(() => users);
	}
};
