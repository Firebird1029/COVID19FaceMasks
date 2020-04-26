<template lang="pug">
	b-navbar#nav.navContainer
		p {{user}}
		template(slot="brand")
			b-navbar-item(tag="router-link", :to="{ path: '/' }")
				img(src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png", alt="")
		template(slot="start")
			template(v-if="loggedIn")
				b-navbar-item(tag="router-link", :to="{ name: 'home' }") Home
		template(slot="end")
			template(v-if="loggedIn")
				.buttons
					b-navbar-item.button.is-light(tag="router-link", :to="{ name: 'edit-profile' }") My Profile
					a.button.is-text(@click="logout") Logout
			template(v-else)
				b-navbar-item(tag="div")
					.buttons
						b-navbar-item.button.is-light(tag="router-link", :to="{ name: 'login' }") Log in
						b-navbar-item.button.is-primary(tag="router-link", :to="{ name: 'register' }"): strong Sign up
</template>

<style lang="scss" scoped>
	@import "~bulma";
	#nav {
		padding: 1rem;
		.router-link-exact-active {
			color: $primary;
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
