<template lang="pug">
	section.section.createListingContainer
		form.createListingForm(@submit.prevent="listingFormSubmitted", style="width: 60%; margin-left: 20%")
			b-field(label="Mask Name(s)", :type="{'is-danger': nameErrors.length }", :message="nameErrors")
				b-input(v-model="listing.name", type="text", placeholder="", maxlength="40")
			//- Picture field here
			//- v-model="listing.img"
			b-field(label="Description", :type="{'is-danger': descErrors.length }", :message="(descErrors.length) ? descErrors : '(Optional)'")
				b-input(v-model="listing.description", type="textarea", name="description", placeholder="", maxlength="120")
			br
			b-field
				p.control.has-text-centered
					input.button.is-primary(type="submit", name="submit", value="Post")
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				listing: this.generateBlankListing(),
				errors: []
			};
		},
		computed: {
			...mapState(["user", "listings"]),
			nameErrors() {
				return this.errors.filter((el) => el.toLowerCase().indexOf("name") > -1).join(" ");
			},
			descErrors() {
				return this.errors.filter((el) => el.toLowerCase().indexOf("description") > -1).join(" ");
			},
			internalErrors() {
				return this.errors.filter((el) => el.toLowerCase().indexOf("Unknown error") > -1).join(" ");
			}
		},
		methods: {
			generateBlankListing() {
				return {
					name: "",
					img: "",
					description: "",
					sewerID: this.$store.state.user._id, // can't access computer prop for some reason
					sewerEmail: this.$store.state.user.email,
					sewerFirstName: this.$store.state.user.firstName,
					sewerLastName: this.$store.state.user.lastName
				};
			},
			listingFormSubmitted() {
				this.$store
					.dispatch("createNewListing", this.listing)
					.then((newListing) => {
						// Push to router before clearing listing
						this.$router.push({
							name: "listing",
							params: { urlName: newListing.urlName }
						});
						this.listing = this.generateBlankListing();
					})
					.catch((errData) => {
						this.errors = errData.userErrors;

						if (this.internalErrors.length) {
							this.$buefy.snackbar.open({
								duration: 3000,
								message: this.internalErrors,
								type: "is-danger",
								position: "is-top-right"
							});
						}
					});
			}
		}
	};
</script>
