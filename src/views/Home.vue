<template lang="pug">
	section.section.homeContainer
		.tile.is-ancestor(style="flex-wrap: wrap;")
			//- https://stackoverflow.com/questions/42931638/how-to-make-tiles-wrap-with-bulma-css
			ListingCard(v-for="listing in listings", :key="listing._id", :listing="listing")

</template>

<style lang="scss" scoped>
	//
</style>

<script>
	import { mapState } from "vuex";

	export default {
		components: {
			ListingCard: () => import("@/components/ListingCard.vue"),
			ProfileCard: () => import("@/components/ProfileCard.vue")
		},
		data() {
			return {};
		},
		computed: {
			...mapState(["listings"])
		},
		methods: {
			refresh() {
				this.$store.dispatch("fetchListings");
			}
		},
		mounted() {
			// TODO move this to App.vue, return if logged in, else no
			if (!this.listings.length) {
				this.refresh();
			}
		}
	};
</script>
