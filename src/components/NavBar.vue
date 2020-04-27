<template lang="pug">
	b-navbar#nav.navContainer
		template(slot="brand")
			b-navbar-item(tag="router-link", :to="{ path: '/' }")
				img(src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png", alt="")
		template(slot="start")
			template(v-if="loggedIn")
				b-navbar-item(tag="router-link", :to="{ name: 'home' }") Home
				b-navbar-item
					span &nbsp;
					b-autocomplete(v-model="searchText", v-show="listings.length", placeholder="Search", :data="fusedListings", field="item.name", @select="option => selectedSearchListing = option", clearable, icon="search", icon-pack="fad", rounded)
		template(slot="end")
			template(v-if="loggedIn")
				.level: .level-right
					.level-item
						b-button.button.is-light(tag="router-link", :to="{name: 'create-listing'}") Donate mask
					.level-item
						b-dropdown(position='is-bottom-left')
							b-navbar-item(slot='trigger', role='button')
								span Menu
								b-icon(icon='menu-down')
							b-dropdown-item(custom)
								span.is-unselectable Logged in as 
								strong.is-unselectable {{ user.firstName }} &nbsp; {{ user.lastName }}
							hr.dropdown-divider
							b-dropdown-item: router-link(tag="span", :to="{ name: 'my-listings' }"): .level(style="width: 100%"): .level-left
								.level-item: b-icon(icon="head-side-mask", pack="fad")
								.level-item: span My Masks
							b-dropdown-item: router-link(tag="span", :to="{ name: 'edit-profile' }"): .level: .level-left
								.level-item: b-icon(icon="cog", pack="fas")
								.level-item: span My Profile
							hr.dropdown-divider
							b-dropdown-item(@click="logout"): .level: .level-left
								.level-item: b-icon(icon="sign-out", pack="fas")
								.level-item: span Logout
			template(v-else)
				b-navbar-item(tag="div")
					.buttons
						router-link(:to="{ name: 'login' } ", tag="b-button", class="button is-light") Log in
						router-link(:to="{ name: 'register' } ", tag="b-button", class="button is-primary") Sign up
</template>

<style lang="scss" scoped>
	#nav {
		padding: 1rem;
		.router-link-exact-active:not(.is-primary) {
			color: $primary;
		}

		// Fix dropdown styling against Buefy
		a.navbar-item:hover {
			background-color: initial;
		}
		.dropdown {
			a.dropdown-item {
				padding-right: 0;
			}

			.dropdown-item:focus {
				outline: 0;
			}
		}
	}
</style>

<script>
	import { mapState, mapGetters } from "vuex";
	import Fuse from "fuse.js";

	export default {
		data() {
			return {
				searchText: "",
				selectedSearchListing: null
			};
		},
		computed: {
			...mapState(["user", "listings"]),
			...mapGetters(["loggedIn"]),
			fusedListings() {
				return new Fuse(this.listings, {
					keys: ["name", "description", "sewerFirstName", "sewerLastName"]
				}).search(this.searchText);
			}
		},
		methods: {
			logout() {
				this.$store.dispatch("logout");
			}
		},
		watch: {
			selectedSearchListing() {
				if (this.selectedSearchListing) {
					this.$router.push({
						name: "listing",
						params: { urlName: this.selectedSearchListing.item.urlName }
					});
				}
			}
		}
	};
</script>
