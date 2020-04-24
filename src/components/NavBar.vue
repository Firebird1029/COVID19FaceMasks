<template lang="pug">
	#nav.navContainer
		router-link(:to="{ name: 'launch' }") Launch
		|  | 
		router-link(:to="{ name: 'home' }") Home
		|  | 
		router-link(:to="{ name: 'login' }") Login
		|  | 
		router-link(:to="{ name: 'register' }") Signup
		|  | 
		router-link(:to="{ name: 'profile', params: {username: 'TODO_MY_USERNAME_HERE'} }") My Profile
</template>

<style lang="scss" scoped>
	#nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				//
			};
		}
	};
</script>
