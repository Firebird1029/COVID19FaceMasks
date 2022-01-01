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
				b-button(type="is-primary", expanded, @click="contactNow", v-if="!ownsThisListing") Contact Now
				p.spacer
				p.spacer
				p
					//- Checkbox if handcrafted
					span Posted by&nbsp;
					strong {{ listing.sewerFirstName }} {{ listing.sewerLastName }}
				div(v-if="ownsThisListing")
					p.spacer
					p.spacer
					p.spacer
					hr
					.columns
						//- TODO -- add Edit functionality
						//- .column: b-button(type="is-outlined", expanded, @click="editListing", :disabled="processing") Edit
						.column: b-button(type="is-danger", expanded, @click="deleteListing", :disabled="processing") Delete
				//- TODO
				//- p Other masks by {{ listing.sewerFirstName }}:
		b-modal(:active.sync="contacNowModalActive", has-modal-card, trap-focus, scroll="keep")
			.modal-card(style="width: auto;")
				header.modal-card-head
					p.modal-card-title {{ listing.sewerFirstName }} {{ listing.sewerLastName }}
				section.modal-card-body(style="min-width: 50rem;")
					p {{ listing.sewerEmail }}
					p.spacer
				footer.modal-card-foot
					button.button(type="button", @click="contacNowModalActive = false;") Close
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
				listing: {},
				processing: false,
				contacNowModalActive: false
			};
		},
		computed: {
			ownsThisListing() {
				return this.listing.sewerID === this.$store.state.user._id;
			}
		},
		methods: {
			contactNow() {
				this.contacNowModalActive = true;
			},
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
			},
			editListing() {
				this.$buefy.snackbar.open({
					duration: 3000,
					message: "Coming soon!",
					type: "is-primary",
					position: "is-top-right",
					queue: false
				});
			},
			deleteListing() {
				this.processing = true;
				this.$store
					.dispatch("deleteListing", this.listing.urlName)
					.then(() => {
						this.$buefy.snackbar.open({
							duration: 3000,
							message: "Listing removed successfully!",
							type: "is-success",
							position: "is-top-right"
						});
						this.$router.push({ name: "home" });
					})
					.catch((err) => {
						console.log(err);
						this.$buefy.snackbar.open({
							duration: 3000,
							message: "Unknown error occured while removing listing.",
							type: "is-danger",
							position: "is-top-right"
						});

						this.processing = true;
					});
			}
		},
		mounted() {
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
