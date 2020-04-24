<template lang="pug">
	.profileCardContainer
		router-link(:to="{name: 'profile', params: { username: profile.username }}")
			span {{ profile.username }}
</template>

<style lang="scss" scoped>
	//
</style>

<script>
	export default {
		props: {
			profile: Object
		},
		data() {
			return {};
		}
	};
</script>
