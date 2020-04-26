import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/services/apiService.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		auth: false,
		user: {},
		listings: []
	},
	getters: {
		loggedIn: (state) => {
			return state.auth;
		},
		listingsLength: (state) => {
			return state.listings.length;
		},
		getListingByID: (state) => (id) => {
			return state.listings.find((listing) => listing.id === id);
		}
	},
	mutations: {
		SET_SESSION_USER_DATA(state, sessionUserData) {
			apiService.setAxiosBearerHeader(sessionUserData.token);
			state.auth = sessionUserData.auth;
			state.user = sessionUserData.user;
			localStorage.setItem("savedUserData", JSON.stringify(sessionUserData.user));
		},
		CLEAR_SESSION_USER_DATA() {
			localStorage.removeItem("savedUserData");
			location.reload();
		},
		ADD_LISTING(state, newListing) {
			state.listings.push(newListing);
		},
		SET_LISTINGS(state, listings) {
			state.listings = listings;
		}
	},
	actions: {
		register({ commit }, accountInfo) {
			return apiService
				.register(accountInfo)
				.then((res) => {
					commit("SET_SESSION_USER_DATA", res.data);
				})
				.catch((err) => {
					// Return errors back to Vue component
					throw err.response.data;
				});
		},
		login({ commit }, credentialsInfo) {
			return apiService
				.login(credentialsInfo)
				.then((res) => {
					// Login successful, so store user data
					commit("SET_SESSION_USER_DATA", res.data);
				})
				.catch((err) => {
					// Return errors back to Vue component
					throw err.response.data;
				});
		},
		logout({ commit }) {
			commit("CLEAR_SESSION_USER_DATA");
		},
		createNewListing({ commit }, newListing) {
			apiService
				.postNewListing(newListing)
				.then((res) => {
					commit("ADD_LISTING", res.data);
				})
				.catch((err) => console.log("Error in createNewListing in actions in Vuex store", err));
		},
		fetchListings({ commit }) {
			apiService
				.getListings()
				.then((res) => {
					commit("SET_LISTINGS", res.data);
				})
				.catch((err) => console.log("Error in fetchListings in actions in Vuex store", err));
		}
	},
	modules: {}
});
