<template lang="pug">
	.loginContainer
		form(@submit.prevent="loginFormSubmitted")
			label Email
			input(v-model="email", type="email", name="email")
			label Password
			input(v-model="password", type="password", name="password")
			input(type="submit", name="submit", value="Submit")
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
					});
			}
		}
	};
</script>
