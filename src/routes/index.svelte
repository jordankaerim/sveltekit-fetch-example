<script>
	import auth from '$lib/stores/auth';
	import users from '$lib/stores/users';
	import status from '$lib/stores/status';
</script>

<div>
	<div class="buttons">
		<button on:click={() => auth.login()} disabled={$status.auth.loggingIn}>
			{$status.auth.loggingIn ? 'Please wait...' : 'Login'}
		</button>

		<button on:click={() => users.all()} disabled={$status.users.fetching}>
			{$status.users.fetching ? 'Please wait...' : 'Fetch users'}
		</button>
	</div>

	<div class="json">
		<code>{$status.users.fetching ? '' : JSON.stringify($users, null, 2)}</code>
	</div>
</div>

<style>
	div {
		padding-top: 8em;
	}

	.buttons {
		display: flex;
		justify-content: center;
	}

	button {
		margin: 0 1em;
	}

	.json {
		margin-top: 2em;
		display: flex;
		justify-content: center;
	}

	code {
		white-space: pre;
	}
</style>
