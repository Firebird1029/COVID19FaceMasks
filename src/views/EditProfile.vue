<template lang="pug">
	section.section.editProfileContainer
		form(@submit.prevent="profileFormSubmitted", style="width: 60%; margin-left: 20%")
			b-field(grouped)
				b-field(expanded, label="First Name", :type="{'is-danger': filteredErrors.fNameErrors.length }", :message="filteredErrors.fNameErrors")
					b-input(v-model="accountInfo.firstName", type="text", name="fname", placeholder="First Name", :disabled="isLoading")
				b-field(expanded, label="Last Name", :type="{'is-danger': filteredErrors.lNameErrors.length }", :message="filteredErrors.lNameErrors")
					b-input(v-model="accountInfo.lastName", type="text", name="lname", placeholder="Last Name", :disabled="isLoading")
			b-field(label="Email", :type="{'is-danger': filteredErrors.emailErrors.length }", :message="filteredErrors.emailErrors")
				b-input(v-model="accountInfo.email", type="email", name="email", placeholder="Email", icon="envelope", icon-pack="fad", disabled)
			b-field(label="Phone Number", :type="{'is-danger': filteredErrors.phoneErrors.length }", :message="filteredErrors.phoneErrors")
				b-input(v-model="accountInfo.phone", type="phone", name="phone", placeholder="Phone Number", icon="phone", icon-pack="fad", :disabled="isLoading")
			br
			b-field
				p.control.has-text-centered
					input.button(type="submit", name="submit", value="Update Profile")
		p.spacer
		hr
		p.spacer
		form(@submit.prevent="passwordFormSubmitted", style="width: 60%; margin-left: 20%")
			b-field(label="Password", :type="{'is-danger': filteredErrors.passwordErrors.length }", :message="filteredErrors.passwordErrors")
				b-input(v-model="accountInfo.password", type="password", name="password", placeholder="Password", password-reveal="", icon="lock", icon-pack="fad")
			br
			b-field
				p.control.has-text-centered
					input.button(type="submit", name="submit", value="Change Password")
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	export default {
		data() {
			return {
				accountInfo: {
					email: "",
					firstName: "",
					lastName: "",
					phone: ""
				},
				passwordInfo: {
					oldPassword: "",
					newPassword: "",
					newPasswordConfirm: ""
				},
				isLoading: false,
				errors: []
			};
		},
		computed: {
			filteredErrors() {
				return {
					fNameErrors: this.errors.filter((el) => el.toLowerCase().indexOf("first name") > -1).join(" "),
					lNameErrors: this.errors.filter((el) => el.toLowerCase().indexOf("last name") > -1).join(" "),
					emailErrors: this.errors.filter((el) => el.toLowerCase().indexOf("email") > -1).join(" "),
					passwordErrors: this.errors.filter((el) => el.toLowerCase().indexOf("password") > -1).join(" "),
					phoneErrors: this.errors.filter((el) => el.toLowerCase().indexOf("phone") > -1).join(" "),
					internalErrors: this.errors.filter((el) => el.toLowerCase().indexOf("unknown error") > -1).join(" ")
				};
			}
		},
		methods: {
			autofillUserInfo(userData) {
				Object.keys(this.accountInfo).map((key) => {
					this.accountInfo[key] = userData[key];
				});
			},
			profileFormSubmitted() {
				// Prevent user input
				this.isLoading = true;
				let loadingComponent = this.$buefy.loading.open();

				// Dispatch action in store
				this.$store
					.dispatch("updateUser", this.accountInfo)
					.then((userData) => {
						// Update user data
						this.autofillUserInfo(userData);
						this.errors = [];

						// Display succcess to user
						this.isLoading = false;
						loadingComponent.close();
						this.$buefy.snackbar.open({
							duration: 3000,
							message: "Profile updated successfully!",
							type: "is-success",
							position: "is-top-right"
						});
					})
					.catch((errData) => {
						// i.e. first name field is blank
						this.errors = errData.userErrors;

						if (this.filteredErrors.internalErrors.length) {
							this.$buefy.snackbar.open({
								duration: 3000,
								message: this.filteredErrors.internalErrors,
								type: "is-danger",
								position: "is-top-right"
							});
						}

						this.isLoading = false;
						loadingComponent.close();
					});
			},
			passwordFormSubmitted() {}
		},
		mounted() {
			// Autofill page fields upon page load
			this.$store
				.dispatch("fetchUserData")
				.then((userData) => {
					this.autofillUserInfo(userData);
				})
				.catch((err) => console.log(err)); // TODO error management
		}
	};
</script>
