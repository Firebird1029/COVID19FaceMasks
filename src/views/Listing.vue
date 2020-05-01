<template lang="pug">
	section.section.listingContainer
		.columns
			.column
				figure.image.is-square(style="max-height: 10rem;")
					img.centerImage(:src="listing.img")
				br
				br
				.level(style="padding-left: 2rem; padding-right: 2rem;")
					.level-item: b-button(icon-left="heart", icon-pack="far", type="is-danger", outlined) Like
					.level-item: b-button(icon-left="comment", icon-pack="far", outlined) Comment
					.level-item: b-button(icon-left="share-alt", icon-pack="fad", outlined) Share
				br
				a.has-text-grey-light(@click="reportListing", style="padding-left: 2rem;")
					b-icon(icon="flag", pack="far", size="is-small")
					span &nbsp; Report
			.column
				.has-text-centered: h1.title.is-3 {{ listing.name }}
				p {{ listing.description }}
				p.spacer
				b-button(type="is-primary", expanded) Contact Now
				p.spacer
				p
					span Handcrafted by&nbsp;
					strong {{ listing.sewerFirstName }} {{ listing.sewerLastName }}
				p.spacer
				//- p Other masks by {{ listing.sewerFirstName }}:

</template>

<style lang="scss" scoped>
	.centerImage {
		max-height: 100%;
		width: auto !important;
		margin-left: auto;
		margin-right: auto;
	}
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
		methods: {
			reportListing() {
				// TODO
			}
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
