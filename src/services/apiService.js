import axios from "axios";

const apiClient = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
	withCredentials: false, // This is the default
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

export default {
	setAxiosBearerHeader(bearerToken) {
		// https://github.com/axios/axios/issues/209
		apiClient.defaults.headers["Authorization"] = `Bearer ${bearerToken}`;
	},
	register(accountInfo) {
		return apiClient.post("/api/register", accountInfo);
	},
	login(credentialsInfo) {
		return apiClient.post("/api/login", credentialsInfo);
	},
	getPublicUsers() {
		return apiClient.get("/api/users");
	},
	getUserByID(id) {
		return apiClient.get("/api/users/" + id);
	},
	getListings() {
		return apiClient.get("/api/listings");
	},
	postNewListing(listing) {
		return apiClient.post("/api/listings", listing);
	}
};
