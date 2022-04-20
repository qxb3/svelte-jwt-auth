<script>
	import router from 'page'
	import cookie from 'js-cookie'

	import Login from './Login.svelte'
	import Register from './Register.svelte'
	import Dashboard from './Dashboard.svelte'
	import NotFound from './NotFound.svelte'

	let page, params = {}
	const isAuthenticated = async (_, next) => {
		const accessToken = cookie.get('accessToken')

		const response = await fetch('http://localhost:3000/authenticate', {
			method: 'POST',
			headers: {
				'Authentication': `Bearer ${accessToken}`
			}
		})

		const json = await response.json()
		console.log(json)
		if (response.status !== 200) {
			return router.redirect('/login')
		}

		params.user = json.user

		next()
	}

	router('/login', () => (page = Login))
	router('/register', () => (page = Register))
	router('/', '/dashboard')
	router('/dashboard', isAuthenticated, () => (page = Dashboard))
	router('/*', () => (page = NotFound))

	router.start()
</script>

<main>
	<svelte:component this={page} {params} {router}></svelte:component>
</main>

<style>
</style>
