<template lang="pug">
	.listingCard.tile.is-parent.is-3
		article.tile.is-child.card
				//- Header 
				//- header.card-header
				//- 	p.card-header-title Component
				//- 	a.card-header-icon(href='#')
				//- 		span.icon
				//- 			i.fas.fa-angle-down
				.card-image
					figure.image.is-4by3
						img(src='https://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
				.card-content
					.content {{ description }}
					.media
						.media-content
							p.title.is-5 {{ listing.name }}
							p.subtitle.is-6 {{ listing.sewerFirstName }} {{ listing.sewerLastName }}
						.media-right
							figure.image.is-48x48
								img(src='https://bulma.io/images/placeholders/96x96.png', alt='Placeholder image')
				footer.card-footer
					p.card-footer-item.has-text-centered
						a.has-text-danger(@click="like"): b-icon(icon="heart", pack="far")
					p.card-footer-item.has-text-centered
						a(@click="like"): b-icon(icon="comment", pack="far")
					p.card-footer-item.has-text-centered
						a(@click="like"): b-icon(icon="share-alt", pack="fad")
</template>

<style lang="scss" scoped>
	//
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
			description() {
				const lengthMax = 80;
				if (this.listing.description.length > lengthMax) {
					return this.listing.description.substring(0, lengthMax) + "...";
				}
				return this.listing.description;
			}
		},
		methods: {
			like() {
				console.log("liked!");
			}
		}
	};
</script>
