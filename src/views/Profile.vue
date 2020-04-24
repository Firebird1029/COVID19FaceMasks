<template lang="pug">
	.userContainer
		p {{ username }}
		p {{ profile }}
</template>

<style lang="scss" scoped></style>

<script>
	import ApiService from "@/services/apiService.js";
	export default {
		props: ["username"],
		data() {
			return {
				profile: {}
			};
		},
		created() {
			ApiService.getUserByID(this.username)
				.then((res) => {
					this.profile = res.data;
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	};
</script>
