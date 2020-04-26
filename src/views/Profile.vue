<template lang="pug">
	.userContainer
		p {{ id }}
		p {{ profile }}
</template>

<style lang="scss" scoped></style>

<script>
	import ApiService from "@/services/apiService.js";
	export default {
		props: ["id"],
		data() {
			return {
				profile: {}
			};
		},
		created() {
			ApiService.getUserByID(this.id)
				.then((res) => {
					this.profile = res.data;
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	};
</script>
