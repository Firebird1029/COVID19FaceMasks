<template lang="pug">
	.homeContainer
		p(v-for="listing in listings", :key="listing._id") {{listing}}
		//- ProfileCard(v-for="listing in listings", :key="listing._id", :profile="listing")
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	import { mapState } from "vuex";

	export default {
		components: {
			ProfileCard: () => import("@/components/ProfileCard.vue")
		},
		data() {
			return {};
		},
		computed: {
			...mapState(["listings"])
		},
		created() {
			this.$store.dispatch("fetchListings");
		}
	};
</script>
