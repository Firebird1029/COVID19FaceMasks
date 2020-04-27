<template lang="pug">
	section.section.listingContainer
		p {{listing}}
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	// import { mapGetters } from "vuex";
	export default {
		props: ["urlName"],
		data() {
			return {
				listing: {}
			};
		},
		created() {
			this.$store
				.dispatch("fetchOneListingByURL", this.urlName)
				.then((fetchedListing) => {
					if (fetchedListing) {
						this.listing = fetchedListing;
					} else {
						this.$buefy.snackbar.open({
							duration: 3000,
							message: "Listing not found.",
							type: "is-danger",
							position: "is-top-right"
						});
						this.$router.push({ name: "home" });
					}
				})
				.catch(({ userErrors }) => {
					if (userErrors) {
						this.$buefy.snackbar.open({
							duration: 3000,
							message: userErrors.join(" "),
							type: "is-danger",
							position: "is-top-right"
						});
						this.$router.push({ name: "home" });
					}
				});
		}
	};
</script>
