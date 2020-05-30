<template lang="pug">
	.listingCard.tile.is-parent.is-2
		article.tile.is-child.card
				//- Header 
				//- header.card-header
				//- 	p.card-header-title Component
				//- 	a.card-header-icon(href='#')
				//- 		span.icon
				//- 			i.fas.fa-angle-down
				.card-image
					router-link(:to="route")
						figure.image.is-square
							img.centerImage(:src="listing.img")
				.card-content
						p.title.is-5.limitOneLine: strong: router-link.has-text-dark(:to="route") {{ listing.name }}
						.content.limitContentLines: router-link.has-text-dark(:to="route") {{ listing.description }}
						.media
							.media-left
								figure.image.is-48x48
									img(src="https://bulma.io/images/placeholders/96x96.png", alt="Placeholder image")
							.media-content
								p.limitOneLine: strong {{ listing.sewerFirstName }} {{ listing.sewerLastName }}
							p.limitOneLine(style="font-size: 0.8rem") {{ sewerDetails }}
				footer.card-footer
					a.card-footer-item.has-text-centered.has-text-danger(@click="likeFeature"): b-icon(icon="heart", pack="far")
					a.card-footer-item.has-text-centered.has-text-dark(@click="commentFeature"): b-icon(icon="comment", pack="far")
					a.card-footer-item.has-text-centered.has-text-dark(@click="shareFeature"): b-icon(icon="share-alt", pack="fad")
</template>

<style lang="scss" scoped>
	.limitContentLines {
		// https://stackoverflow.com/questions/11151728/css-min-height-by-number-of-lines
		line-height: 1.4em;
		min-height: calc(1.4em * 2);

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.limitOneLine {
		// https://stackoverflow.com/questions/3922739/limit-text-length-to-n-lines-using-css
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
</style>

<script>
	export default {
		props: {
			listing: Object
		},
		data() {
			return {
				//
			};
		},
		computed: {
			// description() {
			// 	const lengthMax = 80;
			// 	if (this.listing.description.length > lengthMax) {
			// 		return this.listing.description.substring(0, lengthMax) + "...";
			// 	}
			// 	return this.listing.description;
			// },
			sewerDetails() {
				return "";
			},
			route() {
				return { name: "listing", params: { urlName: this.listing.urlName } };
			}
		},
		methods: {
			likeFeature() {
				this.$buefy.snackbar.open({
					duration: 3000,
					message: "Coming soon!",
					type: "is-primary",
					position: "is-top-right",
					queue: false
				});
			},
			commentFeature() {
				this.$buefy.snackbar.open({
					duration: 3000,
					message: "Coming soon!",
					type: "is-primary",
					position: "is-top-right",
					queue: false
				});
			},
			shareFeature() {
				this.$buefy.snackbar.open({
					duration: 3000,
					message: "Coming soon!",
					type: "is-primary",
					position: "is-top-right",
					queue: false
				});
			}
		}
	};
</script>
