<template lang="pug">
	.registerContainer
		form(@submit.prevent="registerFormSubmitted")
			label First Name
			input(v-model="accountInfo.firstName", type="text", name="fname")
			label Last Name
			input(v-model="accountInfo.lastName", type="text", name="lname")
			label Email
			input(v-model="accountInfo.email", type="email", name="email")
			label Password
			input(v-model="accountInfo.password", type="password", name="password")
			label Phone Number
			input(v-model="accountInfo.phone", type="phone", name="phone")

			input(type="submit" name="submit" value="Submit")
		router-link(:to="{name: 'login'}") Login
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
				errors: []
			};
		},
		methods: {
			registerFormSubmitted() {
				this.$store
					.dispatch("register", this.accountInfo)
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
