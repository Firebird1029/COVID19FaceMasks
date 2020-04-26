<template>
	<div id="app">
		<NavBar />
		<article class="article">
			<router-view />
		</article>
	</div>
</template>

<style lang="scss">
	// Import Bulma's core
	@import "~bulma/sass/utilities/_all";

	// Set your colors
	$primary: #8c67ef;
	$primary-invert: findColorInvert($primary);
	$twitter: #4099ff;
	$twitter-invert: findColorInvert($twitter);

	// Setup $colors to use as bulma classes (e.g. 'is-twitter')
	$colors: (
		"white": (
			$white,
			$black
		),
		"black": (
			$black,
			$white
		),
		"light": (
			$light,
			$light-invert
		),
		"dark": (
			$dark,
			$dark-invert
		),
		"primary": (
			$primary,
			$primary-invert
		),
		"info": (
			$info,
			$info-invert
		),
		"success": (
			$success,
			$success-invert
		),
		"warning": (
			$warning,
			$warning-invert
		),
		"danger": (
			$danger,
			$danger-invert
		),
		"twitter": (
			$twitter,
			$twitter-invert
		)
	);

	// Links
	$link: $primary;
	$link-invert: $primary-invert;
	$link-focus-border: $primary;

	// Import Bulma and Buefy styles
	@import "~bulma";
	@import "~buefy/src/scss/buefy";

	#app {
	}
</style>

<script>
	import Vue from "vue";
	import VueHead from "vue-head";
	import Buefy from "buefy";
	import "buefy/dist/buefy.css";

	export default {
		components: {
			NavBar: () => import("@/components/NavBar.vue")
		},
		head: {
			title: {
				inner: "Face Masks"
			},
			// Meta tags
			meta: [
				// { name: "application-name", content: "Name of my application" },
				// { name: "description", content: "A description of the page", id: "desc" }, // id to replace intead of create element
				// ...
				// Twitter
				// { name: "twitter:title", content: "Content Title" },
				// with shorthand
				// { n: "twitter:description", c: "Content description less than 200 characters" },
				// ...
				// Google+ / Schema.org
				// { itemprop: "name", content: "Content Title" },
				// { itemprop: "description", content: "Content Title" },
				// ...
				// Facebook / Open Graph
				// { property: "fb:app_id", content: "123456789" },
				// { property: "og:title", content: "Content Title" },
				// with shorthand
				// { p: "og:image", c: "https://example.com/image.jpg" }
				// ...
			],
			// link tags
			link: [
				// { rel: "canonical", href: "http://example.com/#!/contact/", id: "canonical" },
				// { rel: "author", href: "author", undo: false }, // undo property - not to remove the element
				// { rel: "icon", href: require("./path/to/icon-16.png"), sizes: "16x16", type: "image/png" },
				// with shorthand
				// { r: "icon", h: "path/to/icon-32.png", sz: "32x32", t: "image/png" }
				// ...
				{
					rel: "stylesheet",
					href: "https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"
				},
				{ rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css" }
			],
			script: [
				// { type: "text/javascript", src: "cdn/to/script.js", async: true, body: true }, // Insert in body
				// with shorthand
				// { t: "application/ld+json", i: '{ "@context": "http://schema.org" }' }
				// ...
				// { async: true, src: "https://use.fontawesome.com/releases/v5.0.9/js/all.js" }
			],
			style: [
				// { type: "text/css", inner: "body { background-color: #000; color: #fff}", undo: false }
				// ...
			]
		}
	};

	// Buefy
	Vue.use(Buefy);

	// Head
	Vue.use(VueHead);
</script>
