<template lang="pug">
	section.section.loginContainer
		form.loginForm(@submit.prevent="loginFormSubmitted")
			b-field(label="Email", :type="{'is-danger': emailErrors.length }", :message="emailErrors", style="width: 60%; margin-left: 20%")
				b-input(v-model="email", type="email", name="email", icon="email", placeholder="Email")

			b-field(label="Password", :type="{'is-danger': passwordErrors.length }", :message="passwordErrors", style="width: 60%; margin-left: 20%")
				b-input(v-model="password", type="password", name="password", placeholder="Password", password-reveal="", icon="lock")
			b-field
				p.control.has-text-centered
					input.button.is-primary(type="submit", name="submit", value="Submit")

			router-link(:to="{name: 'register'}") Register
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	export default {
		data() {
			return {
				email: "",
				password: "",
				errors: []
			};
		},
		computed: {
			emailErrors() {
				return this.errors.filter((el) => el.indexOf("email") > -1).join(" ");
			},
			passwordErrors() {
				return this.errors.filter((el) => el.indexOf("password") > -1).join(" ");
			},
			internalErrors() {
				return this.errors
					.filter((el) => el.indexOf("Unknown error") > -1 || el.indexOf("Failed login") > -1)
					.join(" ");
			}
		},
		methods: {
			loginFormSubmitted() {
				this.$store
					.dispatch("login", {
						email: this.email,
						password: this.password
					})
					.then(() => {
						this.$router.push({ name: "home" });
					})
					.catch((errData) => {
						this.errors = errData.userErrors;

						if (this.internalErrors.length) {
							this.$buefy.snackbar.open({
								duration: 2000,
								message: this.internalErrors,
								type: "is-danger",
								position: "is-top-right"
								// actionText: "Retry",
								// onAction: () => {
								// 	this.$buefy.toast.open({
								// 		message: "Action pressed",
								// 		queue: false
								// 	});
								// }
							});
						}
					});
			}
		}
	};
</script>
