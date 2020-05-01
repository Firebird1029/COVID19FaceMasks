<template lang="pug">
	section.section.listingContainer
		.columns
			.column
				figure.image.is-square(style="max-height: 10rem;")
					img.centerImage(:src="listing.img")
				br
				br
				.level(style="padding-left: 2rem; padding-right: 2rem;")
					.level-item: b-button(icon-left="heart", icon-pack="far", type="is-danger", outlined, @click="likeFeature") Like
					.level-item: b-button(icon-left="comment", icon-pack="far", outlined, @click="commentFeature") Comment
					.level-item: b-button(icon-left="share-alt", icon-pack="fad", outlined, @click="shareFeature") Share
				br
				a.has-text-grey-light(@click="reportListing", style="padding-left: 2rem;")
					b-icon(icon="flag", pack="far", size="is-small")
					span &nbsp; Report
			.column
				.has-text-centered: h1.title.is-3 {{ listing.name }}
				br
				p {{ listing.description }}
				p.spacer
				b-button(type="is-primary", expanded) Contact Now
				p.spacer
				p.spacer
				p
					span Handcrafted by&nbsp;
					strong {{ listing.sewerFirstName }} {{ listing.sewerLastName }}
				p.spacer
				//- p Other masks by {{ listing.sewerFirstName }}:

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
		methods: {
			likeFeature() {
				this.$buefy.snackbar.open({
					duration: 3000,
					message: "Coming soon!",
					type: "is-primary",
					position: "is-top-right",
					queue: false
				});
			},
			commentFeature() {
				this.$buefy.snackbar.open({
					duration: 3000,
					message: "Coming soon!",
					type: "is-primary",
					position: "is-top-right",
					queue: false
				});
			},
			shareFeature() {
				this.$buefy.snackbar.open({
					duration: 3000,
					message: "Coming soon!",
					type: "is-primary",
					position: "is-top-right",
					queue: false
				});
			},
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
