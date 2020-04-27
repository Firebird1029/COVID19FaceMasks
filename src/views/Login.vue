<template lang="pug">
	section.section.loginContainer
		form.loginForm(@submit.prevent="loginFormSubmitted", style="width: 60%; margin-left: 20%")
			b-field(label="Email", :type="{'is-danger': emailErrors.length }", :message="emailErrors")
				b-input(v-model="email", type="email", name="email", placeholder="Email", icon="envelope", icon-pack="fad")
			b-field(label="Password", :type="{'is-danger': passwordErrors.length }", :message="passwordErrors")
				b-input(v-model="password", type="password", name="password", placeholder="Password", password-reveal="", icon="lock", icon-pack="fad")
			br
			b-field
				p.control.has-text-centered
					input.button.is-primary(type="submit", name="submit", value="Login")
		br
		br
		br
		.container.has-text-centered
			router-link(:to="{name: 'register'}")
				button.button Create an account
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
