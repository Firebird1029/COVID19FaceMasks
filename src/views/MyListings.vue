<template lang="pug">
	section.section.myListingsContainer
		.tile.is-ancestor(style="flex-wrap: wrap;")
			//- https://stackoverflow.com/questions/42931638/how-to-make-tiles-wrap-with-bulma-css
			ListingCard(v-for="listing in listings.filter((el) => el.sewerID === user._id)", :key="listing._id", :listing="listing")

</template>

<style lang="scss" scoped>
	//
</style>

<script>
	import { mapState, mapGetters } from "vuex";

	export default {
		components: {
			ListingCard: () => import("@/components/ListingCard.vue"),
			ProfileCard: () => import("@/components/ProfileCard.vue")
		},
		data() {
			return {};
		},
		computed: {
			...mapState(["user", "listings"]),
			...mapGetters(["refreshedServer"])
		},
		methods: {},
		mounted() {
			// TODO move this to App.vue, return if logged in, else no
			if (!this.refreshedServer) {
				this.$store.dispatch("fetchListings");
			}
		}
	};
</script>
