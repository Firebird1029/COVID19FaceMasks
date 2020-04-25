import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/services/apiService.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			id: "3939393",
			username: "bob",
			password: "kjfkdsjflsdj",
			email: "bobady@bobo.com",
			firstName: "bdsf",
			lastName: "dfdffdf",
			phone: "3939393"
		},
		listings: [
			{
				id: 1,
				name: "listing1"
			},
			{
				id: 2,
				name: "listing2"
			}
		]
	},
	getters: {
		listingsLength: (state) => {
			return state.listings.length;
		},
		getListingByID: (state) => (id) => {
			return state.listings.find((listing) => listing.id === id);
		}
	},
	mutations: {
		ADD_LISTING(state, newListing) {
			state.listings.push(newListing);
		}
	},
	actions: {
		createNewListing({ commit }, newListing) {
			// TODO handle what happens if no name etc etc -- handle here, on client side, what?
			if (newListing) {
				apiService
					.postNewListing(newListing)
					.then((res) => {
						commit("ADD_LISTING", res.data);
					})
					.catch((err) => console.log("Error in createNewListing in actions in Vuex store", err));
			}
		}
	},
	modules: {}
});
