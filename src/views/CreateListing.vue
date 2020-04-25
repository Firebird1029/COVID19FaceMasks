<template lang="pug">
	section.section.createListingContainer
		p {{ listings }}
		//- p {{ getListingByID(3)}}
		hr
		form(@submit.prevent="submittedListingForm")
			.field
				label Mask Name
				input(v-model="listing.name", type="text", placeholder="Name here")
			.field
				label Picture
				input(v-model="listing.img", type="text", placeholder="bob")
			.field
				label Description
				p.help Optional
				input(v-model="listing.description", type="text", placeholder="im a description")
			input(type="submit", value="Submit")
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	import { mapState, mapGetters } from "vuex";
	export default {
		data() {
			return {
				listing: this.generateBlankListing()
			};
		},
		computed: {
			...mapState(["user", "listings"]),
			...mapGetters(["getListingByID"])
		},
		methods: {
			generateBlankListing() {
				return {
					sewerID: this.$store.state.user.id, // TODO change to computed prop?
					sewerUsername: this.$store.state.user.username,
					name: "",
					img: "",
					description: ""
				};
			},
			submittedListingForm() {
				// Generate a nice url string
				let urlName =
					encodeURI(
						this.listing.name
							.replace(/[^a-zA-Z ]/g, "")
							.replace(/\s+/g, "-")
							.toLowerCase()
							.substring(0, 30)
					) +
					"-" +
					Math.floor(Math.random() * 10000000000);

				this.$store
					.dispatch("createNewListing", { ...this.listing, urlName })
					.then(() => {
						// Push to router before clearing listing
						this.$router.push({
							name: "listing",
							params: { urlName }
						});
						this.listing = this.generateBlankListing();
					})
					.catch((err) => console.log("Error in submittedListingForm method in CreateListing.vue", err));
			}
		}
	};
</script>
