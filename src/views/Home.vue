<template lang="pug">
	.homeContainer
		ProfileCard(v-for="profileListing in profileListings" :key="profileListing.id" :profile="profileListing")
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	// import ProfileCard from "@/components/ProfileCard.vue"
	import ApiService from "@/services/apiService.js";

	export default {
		components: {
			ProfileCard: () => import("@/components/ProfileCard.vue")
		},
		data() {
			return {
				profileListings: []
			};
		},
		created() {
			ApiService.getPublicUsers()
				.then((res) => {
					this.profileListings = res.data;
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	};
</script>
