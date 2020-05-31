<template lang="pug">
	section.section.createListingContainer
		form.createListingForm(@submit.prevent="listingFormSubmitted", style="width: 60%; margin-left: 20%")
			b-field(label="Mask Name(s)", :type="{'is-danger': nameErrors.length }", :message="nameErrors")
				b-input(v-model="listing.name", type="text", placeholder="", maxlength="40", :disabled="isLoading")
			.columns
				.column
					b-field(label="Upload Image", :type="{'is-danger': imgErrors.length }", :message="imgErrors")
						b-upload(v-model="fileUpload", @input="handleFileUpload", drag-drop, accept="image/*", :disabled="isLoading")
							section.section
								.content.has-text-centered
									p: b-icon(icon="upload", size="is-large", pack="fas")
									p Drop your files here or click to upload
				.column
					figure.image.is-square(style="max-height: 10rem;")
						img.centerImage(:src="fileUploadPreviewSrc")
					br
					b-tag(v-show="fileUpload") {{ fileUpload ? fileUpload.name : "" }}
			p.spacer
			b-field(label="Description", :type="{'is-danger': descErrors.length }", :message="(descErrors.length) ? descErrors : '(Optional)'")
				b-input(v-model="listing.description", type="textarea", name="description", placeholder="", maxlength="300", :disabled="isLoading")
			b-field
				p.control.has-text-centered
					input.button.is-primary(type="submit", name="submit", value="Post", :disabled="isLoading")
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	/* eslint-disable */
	import { mapState } from "vuex";
	import apiService from "@/services/apiService.js";

	export default {
		name: "CreateListing",
		data() {
			return {
				isLoading: false,
				listing: this.generateBlankListing(),
				fileUpload: null,
				fileUploadPreviewSrc: "",
				errors: [],
				serverErrors: []
			};
		},
		computed: {
			...mapState(["user", "listings"]),
			nameErrors() {
				return this.errors.filter((el) => el.toLowerCase().indexOf("name") > -1).join(" ");
			},
			imgErrors() {
				return this.errors.filter((el) => el.toLowerCase().indexOf("image") > -1).join(" ");
			},
			descErrors() {
				return this.errors.filter((el) => el.toLowerCase().indexOf("description") > -1).join(" ");
			},
			internalErrors() {
				return this.errors.filter((el) => el.toLowerCase().indexOf("unknown error") > -1).join(" ");
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
			handleFileUpload() {
				if (this.fileUpload.size > 3 * 1024 * 1024) {
					// File size too big
					this.fileUpload = null;
					this.$buefy.snackbar.open({
						duration: 3000,
						message: "Image file size cannot exceed 3 MB.",
						type: "is-danger",
						position: "is-top-right"
					});
				} else {
					// Show preview
					let reader = new FileReader();
					reader.onload = (e) => {
						this.fileUploadPreviewSrc = e.target.result;
					};
					reader.readAsDataURL(this.fileUpload);
				}
			},
			listingFormSubmitted() {
				// Prevent user input
				this.isLoading = true;
				let loadingComponent = this.$buefy.loading.open();

				let formData = new FormData();
				formData.append("imageFile", this.fileUpload);
				formData.append("listingFormData", JSON.stringify(this.listing));

				// Vuex action to send to database
				this.$store
					.dispatch("createNewListing", formData)
					.then((newListing) => {
						// Show Success Notification
						this.$buefy.snackbar.open({
							duration: 3000,
							message: "Listing created successfully!",
							type: "is-success",
							position: "is-top-right"
						});
						loadingComponent.close();

						// Push to router
						this.$router.push({
							name: "listing",
							params: { urlName: newListing.urlName }
						});

						// No need to clear listing, user will be redirected anyway
						// this.isLoading = false;
						// this.listing = this.generateBlankListing();
					})
					.catch((errData) => {
						// Errors, i.e. user did not fill out all fields
						this.errors = errData.userErrors;
						this.serverErrors = errData.serverErrors;

						if (this.internalErrors.length) {
							this.$buefy.snackbar.open({
								duration: 3000,
								message: this.internalErrors,
								type: "is-danger",
								position: "is-top-right"
							});
						}
						loadingComponent.close();
						this.isLoading = false;
					});
			}
		}
	};
</script>
