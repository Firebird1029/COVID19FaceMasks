import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: false, // This is the default
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

export default {
	getPublicUsers() {
		return apiClient.get("/api/users");
	},
	getUserByID(id) {
		return apiClient.get("/api/users/" + id);
	}
};
