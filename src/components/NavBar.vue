<template lang="pug">
	#nav.navContainer
		router-link(:to="{ name: 'launch' }") Launch
		|  | 
		template(v-if="loggedIn")
			//- If logged in
			router-link(:to="{ name: 'home' }") Home
			|  | 
			router-link(:to="{ name: 'profile', params: {id: 'TODO_MY_ID_HERE'} }") My Profile
			|  | 
			button.button(@click="logout") Logout
		template(v-else)
			//- If NOT logged in
			router-link(:to="{ name: 'login' }") Login
			|  | 
			router-link(:to="{ name: 'register' }") Signup
		
</template>

<style lang="scss" scoped>
	#nav {
		text-align: center;

		// Not my CSS Code TODO
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
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				//
			};
		},
		computed: {
			...mapGetters(["loggedIn"])
		},
		methods: {
			logout() {
				this.$store.dispatch("logout");
			}
		}
	};
</script>
