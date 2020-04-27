<template>
	<div id="app">
		<NavBar />
		<article class="article">
			<router-view />
		</article>
	</div>
</template>

<style lang="scss">
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
				// ------------
				{
					rel: "stylesheet",
					href: "https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"
				}
				// { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css" }
			],
			script: [
				// { type: "text/javascript", src: "cdn/to/script.js", async: true, body: true }, // Insert in body
				// with shorthand
				// { t: "application/ld+json", i: '{ "@context": "http://schema.org" }' }
				// ...
				{ src: "https://kit.fontawesome.com/5f3bd4bd8e.js", crossorigin: "anonymous", async: true }
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
