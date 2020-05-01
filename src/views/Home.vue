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
			...mapState(["listings"]),
			...mapGetters(["refreshedServer"])
		},
		methods: {
			refresh() {
				this.$store.dispatch("fetchListings").catch((err) => console.log(err)); // TODO error management
			}
		},
		mounted() {
			// TODO move this to App.vue, return if logged in, else no
			if (!this.refreshedServer) {
				this.refresh();
			}
		}
	};
</script>
