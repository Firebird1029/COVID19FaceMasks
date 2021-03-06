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
		refreshedServer: (state) => {
			return state.listings.length > 0;
		},
		getStateListingByURL: (state) => (urlName) => {
			return state.listings.find((listing) => listing.urlName === urlName);
		}
	},
	mutations: {
		SET_SESSION_USER_DATA(state, sessionUserData) {
			apiService.setAxiosBearerHeader(sessionUserData.token);
			state.auth = sessionUserData.auth;
			state.user = sessionUserData.user;
			localStorage.setItem("savedUserData", JSON.stringify(sessionUserData));
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
		},
		REMOVE_LISTING(state, removedListing) {
			state.listings = state.listings.filter((listing) => {
				listing._id !== removedListing._id;
			});
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
		fetchUserData({ commit }) {
			return new Promise((resolve, reject) => {
				apiService
					.fetchUserData()
					.then((res) => {
						// Store user data
						commit("SET_SESSION_USER_DATA", res.data);
						resolve(res.data.user);
					})
					.catch((err) => {
						reject(err.response.data);
					});
			});
		},
		updateUser({ commit }, profileData) {
			return new Promise((resolve, reject) => {
				apiService
					.updateUser(profileData)
					.then((res) => {
						// Store user data
						commit("SET_SESSION_USER_DATA", res.data);
						resolve(res.data.user);
					})
					.catch((err) => {
						reject(err.response.data);
					});
			});
		},
		changePassword({ commit }, userData) {
			return new Promise((resolve, reject) => {
				apiService
					.changePassword(userData)
					.then((res) => {
						// Store user data
						commit("SET_SESSION_USER_DATA", res.data);
						resolve(res.data.user);
					})
					.catch((err) => {
						reject(err.response.data);
					});
			});
		},
		createNewListing({ commit }, newListing) {
			return new Promise((resolve, reject) => {
				apiService
					.postNewListing(newListing)
					.then((res) => {
						commit("ADD_LISTING", res.data);
						resolve(res.data);
					})
					.catch((err) => reject(err.response.data));
			});
		},
		fetchListings({ commit }) {
			return apiService
				.getListings()
				.then((res) => {
					commit("SET_LISTINGS", res.data);
				})
				.catch((err) => {
					throw err.response.data;
				});
		},
		fetchOneListingByURL({ getters }, urlName) {
			return new Promise((resolve, reject) => {
				if (getters.getStateListingByURL(urlName)) {
					// Listing already exists in Vuex state
					resolve(getters.getStateListingByURL(urlName));
				} else {
					// Look in database
					apiService
						.getListingByURL(urlName)
						.then((res) => resolve(res.data))
						.catch((err) => reject(err.response.data));
				}
			});
		},
		deleteListing({ commit }, urlName) {
			return apiService
				.deleteListing(urlName)
				.then((res) => {
					commit("REMOVE_LISTING", res.data);
				})
				.catch((err) => {
					throw err.response.data;
				});
		}
	},
	modules: {}
});
