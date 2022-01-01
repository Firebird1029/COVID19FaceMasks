<template lang="pug">
	section.section.registerContainer
		form(@submit.prevent="registerFormSubmitted", style="width: 60%; margin-left: 20%")
			b-field(grouped)
				b-field(expanded, label="First Name", :type="{'is-danger': filteredErrors.fNameErrors.length }", :message="filteredErrors.fNameErrors")
					b-input(v-model="accountInfo.firstName", type="text", name="fname", placeholder="First Name")
				b-field(expanded, label="Last Name", :type="{'is-danger': filteredErrors.lNameErrors.length }", :message="filteredErrors.lNameErrors")
					b-input(v-model="accountInfo.lastName", type="text", name="lname", placeholder="Last Name")
			b-field(label="Email", :type="{'is-danger': filteredErrors.emailErrors.length }", :message="filteredErrors.emailErrors")
				b-input(v-model="accountInfo.email", type="email", name="email", placeholder="Email", icon="envelope", icon-pack="fad")
			b-field(label="Password", :type="{'is-danger': filteredErrors.passwordErrors.length }", :message="filteredErrors.passwordErrors")
				b-input(v-model="accountInfo.password", type="password", name="password", placeholder="Password", password-reveal="", icon="lock", icon-pack="fad")
			b-field(label="Phone Number", :type="{'is-danger': filteredErrors.phoneErrors.length }", :message="filteredErrors.phoneErrors")
				b-input(v-model="accountInfo.phone", type="phone", name="phone", placeholder="Phone Number", icon="phone", icon-pack="fad")
			br
			b-field
				b-checkbox(v-model="acceptTerms")
					span I agree to the #[a(href="/terms", target="_blank") terms and conditions]
			br
			b-field
				p.control.has-text-centered
					input.button.is-primary(type="submit", name="submit", value="Create an Account")
		br
		br
		.container.has-text-centered
			router-link(:to="{name: 'login'}")
				button.button.is-text Login instead
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
					password: "",
					firstName: "",
					lastName: "",
					phone: ""
				},
				errors: [],
				acceptTerms: false
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
					internalErrors: this.errors
						.filter(
							(el) =>
								el.toLowerCase().indexOf("unknown error") > -1 ||
								el.toLowerCase().indexOf("already exists") > -1
						)
						.join(" ")
				};
			}
		},
		methods: {
			registerFormSubmitted() {
				if (this.acceptTerms) {
					this.$store
						.dispatch("register", this.accountInfo)
						.then(() => {
							this.$router.push({ name: "home" });
						})
						.catch((errData) => {
							this.errors = errData.userErrors;

							if (this.filteredErrors.internalErrors.length) {
								this.$buefy.snackbar.open({
									duration: 3000,
									message: this.filteredErrors.internalErrors,
									type: "is-danger",
									position: "is-top-right"
								});
							}
						});
				} else {
					// User did not check accept terms
					this.$buefy.snackbar.open({
						duration: 3000,
						message: "Please accept the terms and conditions.",
						type: "is-danger",
						position: "is-top-right"
					});
				}
			}
		}
	};
</script>
