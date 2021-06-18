import status from './stores/status';
import { notifications } from './Notifications.svelte';

const api = Object.freeze({
	async request(description, url, method, body, opts = {}) {
		status.set(this.name, description);

		const headers = { 'Content-Type': 'application/json' };

		const paramsFiltered = Object.entries(opts.params || {}).filter(([, val]) => val);
		const paramsString = new URLSearchParams(paramsFiltered).toString();
		const fullUrl = [this.base + url, paramsString].filter(Boolean).join('?');

		let response;

		try {
			response = await fetch(fullUrl, {
				method,
				headers,
				body: JSON.stringify(body)
			});
		} catch (error) {
			notifications.error('OFFLINE');
		}

		let data;
		let error;

		try {
			data = await response.json();
		} catch (error) {}

		status.reset(this.name, description);

		if (!response.ok) {
			error = data || { code: response.description };

			notifications.error(error.code);

			return { error };
		}

		return { data };
	},

	async get(description, url, opts = {}) {
		return await this.request(description, url, 'GET', undefined, opts);
	},

	async post(description, url, body, opts = {}) {
		return await this.request(description, url, 'POST', body, opts);
	},

	async put(description, url, body, opts = {}) {
		return await this.request(description, url, 'PUT', body, opts);
	},

	async delete(description, url, opts = {}) {
		return await this.request(description, url, 'DELETE', undefined, opts);
	}
});

const BASE = 'http://localhost:3000/api';

function Api(name, base = BASE) {
	if (!(this instanceof Api)) {
		return new Api(name, base);
	}

	Object.defineProperties(this, {
		name: { value: name },
		base: { value: base }
	});

	status.reset(this.name);
}

Object.setPrototypeOf(Api.prototype, api);

export default Api;
