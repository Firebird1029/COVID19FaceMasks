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
					input.button(type="submit", name="submit", value="Update Profile", :disabled="isLoading")
		p.spacer
		hr
		p.spacer
		form(@submit.prevent="passwordFormSubmitted", style="width: 60%; margin-left: 20%")
			b-field(label="Old Password", :type="{'is-danger': filteredErrors.oldPassErrors.length }", :message="filteredErrors.oldPassErrors")
				b-input(v-model="passwordInfo.oldPassword", type="password", name="password", placeholder="Old Password", password-reveal="", icon-pack="fad", :disabled="isLoading")
			b-field(label="New Password", :type="{'is-danger': filteredErrors.newPassErrors.length }", :message="filteredErrors.newPassErrors")
				b-input(v-model="passwordInfo.newPassword", type="password", name="password", placeholder="New Password", password-reveal="", icon-pack="fad", :disabled="isLoading")
			b-field(label="Confirm New Password", :type="{'is-danger': filteredErrors.newPassConfErrors.length }", :message="filteredErrors.newPassConfErrors")
				b-input(v-model="passwordInfo.newPasswordConfirm", type="password", name="password", placeholder="Confirm New Password", password-reveal="", icon-pack="fad", :disabled="isLoading")
			br
			b-field
				p.control.has-text-centered
					input.button(type="submit", name="submit", value="Change Password", :disabled="isLoading")
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	import { mapState } from "vuex";

	export default {
		data() {
			return {
				accountInfo: {
					email: "",
					firstName: "",
					lastName: "",
					phone: ""
				},
				passwordInfo: this.resetPasswordSet(),
				isLoading: false,
				errors: []
			};
		},
		computed: {
			...mapState(["user"]),
			filteredErrors() {
				return {
					fNameErrors: this.errors.filter((el) => el.toLowerCase().indexOf("first name") > -1).join(" "),
					lNameErrors: this.errors.filter((el) => el.toLowerCase().indexOf("last name") > -1).join(" "),
					emailErrors: this.errors.filter((el) => el.toLowerCase().indexOf("email") > -1).join(" "),
					phoneErrors: this.errors.filter((el) => el.toLowerCase().indexOf("phone") > -1).join(" "),
					oldPassErrors: this.errors.filter((el) => el.toLowerCase().indexOf("&ensp;") > -1).join(" "),
					newPassErrors: this.errors.filter((el) => el.toLowerCase().indexOf("&emsp;") > -1).join(" "),
					newPassConfErrors: this.errors.filter((el) => el.toLowerCase().indexOf("&thinsp;") > -1).join(" "),
					internalErrors: this.errors.filter((el) => el.toLowerCase().indexOf("unknown error") > -1).join(" ")
				};
			}
		},
		methods: {
			resetPasswordSet() {
				return {
					oldPassword: "",
					newPassword: "",
					newPasswordConfirm: ""
				};
			},
			autofillUserInfo() {
				Object.keys(this.accountInfo).map((key) => {
					this.accountInfo[key] = this.user[key];
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
			passwordFormSubmitted() {
				// Prevent user input
				this.isLoading = true;
				let loadingComponent = this.$buefy.loading.open();

				// Dispatch action in store
				this.$store
					.dispatch("changePassword", {
						...this.user,
						oldPassword: this.passwordInfo.oldPassword,
						newPassword: this.passwordInfo.newPassword,
						newPasswordConfirm: this.passwordInfo.newPasswordConfirm
					})
					.then(() => {
						// Update user data
						this.passwordInfo = this.resetPasswordSet();
						this.errors = [];

						// Display succcess to user
						this.isLoading = false;
						loadingComponent.close();
						this.$buefy.snackbar.open({
							duration: 3000,
							message: "Password changed successfully!",
							type: "is-success",
							position: "is-top-right"
						});
					})
					.catch((errData) => {
						// i.e. password field is blank, passwords do not match
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
			}
		},
		mounted() {
			// Autofill page fields upon page load
			this.autofillUserInfo();

			// this.$store
			// 	.dispatch("fetchUserData")
			// 	.then((userData) => {
			// 		this.autofillUserInfo(userData);
			// 	})
			// 	.catch((err) => console.log(err)); // TODO error management
		}
	};
</script>
