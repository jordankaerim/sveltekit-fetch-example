<script context="module">
	import { writable } from 'svelte/store';

	const { subscribe, update } = writable([]);

	export const notifications = {
		subscribe,

		show({ level, code, text, dismissAfter }) {
			update((notifications) => [{ level, code, text, dismissAfter }, ...notifications]);
		},

		error(code) {
			this.show({ level: 'error', code, dismissAfter: 5000 });
		},

		success(code) {
			this.show({ level: 'success', code, dismissAfter: 5000 });
		},

		dismiss(notification) {
			update((notifications) => notifications.filter((n) => n !== notification));
		},

		dismissAll() {
			update((_) => []);
		}
	};
</script>

<script>
	import dict from './dictionary/en';
	import { slide } from 'svelte/transition';

	function dismissAfter(_, notification) {
		if (!notification.dismissAfter) return;

		setTimeout(() => {
			notifications.dismiss(notification);
		}, notification.dismissAfter);
	}
</script>

<ul class="notifications">
	{#each $notifications as notification (notification)}
		<li
			class="notification"
			use:dismissAfter={notification}
			transition:slide={{ duration: 200 }}
			class:--error={notification.level === 'error'}
			class:--success={notification.level === 'success'}
		>
			<p class="notification__text">
				{dict[notification.level][notification.code] || notification.text}
			</p>

			<button class="dismiss-btn" on:click={() => notifications.dismiss(notification)}>
				Dismiss
			</button>
		</li>
	{/each}
</ul>

<style>
	* {
		box-sizing: border-box;
	}
	.notifications {
		padding: 0 1em;
		margin: 0 auto;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		pointer-events: none;
	}

	.notification {
		padding: 1em;
		border-radius: 5px;
		margin: 1em auto;
		max-width: 60ch;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		pointer-events: auto;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}

	.notification.--error {
		background-color: #ba135d;
	}

	.notification.--success {
		background-color: #1eae98;
	}

	.notification__text {
		padding: 0;
		margin: 0;
		font-weight: bold;
		font-family: sans-serif;
	}

	.dismiss-btn {
		padding: 0;
		border: none;
		margin: 0;
		appearance: none;
		font-size: inherit;
		color: inherit;
		background: none;
		cursor: pointer;
	}
</style>
