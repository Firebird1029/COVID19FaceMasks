import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store.js";
import axios from "axios";

Vue.config.productionTip = false;

// Title Mixin - Doesn't Work
// import titleMixin from "./services/titleMixin";
// Vue.mixin(titleMixin);

// Automatic Global Registration
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
const requireComponent = require.context("./components", false, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
	const componentConfig = requireComponent(fileName);
	const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1")));

	Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
	router,
	store,
	created() {
		// Automatic login using localstorage
		// https://www.vuemastery.com/courses/token-based-authentication/automatic-login
		if (localStorage.getItem("savedUserData")) {
			this.$store.commit("SET_SESSION_USER_DATA", JSON.parse(localStorage.getItem("savedUserData")));
		}

		// Local Storage Security Feature, https://www.vuemastery.com/courses/token-based-authentication/automatic-login
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response.status.toString().substring(0, 1) === "4") {
					this.$store.dispatch("logout");
				}
				return Promise.reject(error);
			}
		);
	},
	render: (h) => h(App)
}).$mount("#app");
