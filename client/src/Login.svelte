<script>
	import cookie from 'js-cookie'

	export let router

	let username, password

	const login = async () => {
		const response = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})

		const json = await response.json()
		if (response.status !== 200) {
			return alert(json.message)
		}

		cookie.set('accessToken', json.accessToken)
		cookie.set('refreshToken', json.refreshToken)
		router.redirect('/dashboard')
	}
</script>

<div class="container">
	<h1>Login</h1>


	<form>
		<div>
			<h1 class="title">Username</h1>
			<input type="text" required bind:value={username}>
		</div>
		<div>
			<h1 class="title">Password</h1>
			<input type="password" required bind:value={password}>
		</div>

		<button type="submit" on:click|preventDefault={login}>Login</button>
	</form>

	<div class="register">
		<p>Don't have an account?</p>
		<a href="/register">Register</a>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.title {
		font-size: medium;
		margin-bottom: 16px;
		margin: 0;
	}

	input {
		margin: 0;
		margin-bottom: 16px;
	}

	.register {
		text-align: center;
	}
</style>
