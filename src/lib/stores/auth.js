import Api from '../Api';
import { writable } from 'svelte/store';

const api = new Api('auth');
const { subscribe, update } = writable();

export default {
	subscribe,

	async login(email, password) {
		const { data: user, error } = await api.post('loggingIn', '/auth/login', { email, password });

		return error || update((_) => ({ user }));
	},

	async logout() {
		const { error } = await api.post('loggingOut', '/auth/logout');

		return error || set(null);
	}
};
