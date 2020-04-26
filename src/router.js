import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		// TODO change /home to / then add meta needs auth, then call next() if not logged in
		path: "/home",
		name: "home",
		component: () => import("@/views/Home.vue"),
		meta: { requiresAuth: true }
	},
	{
		path: "/",
		name: "launch",
		component: () => import("@/views/Launch.vue")
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/Login.vue")
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/Register.vue")
	},
	{
		path: "/listing/create",
		name: "create-listing",
		component: () => import("@/views/CreateListing.vue")
	},
	{
		path: "/listing/:urlName",
		name: "listing",
		props: true,
		component: () => import("@/views/Listing.vue")
	},
	{
		path: "/profile/:id",
		name: "profile",
		props: true,
		component: () => import("@/views/Profile.vue")
	},
	{ path: "*", redirect: "/" }
	// { path: "*", component: () => import("../views/404.vue") }
	// {
	// 	path: "/about",
	// 	name: "About",
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () =>
	// 		import(/* webpackChunkName: "about" */ "../views/About.vue")
	// }
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const loggedIn = localStorage.getItem("sessionUserData");

	if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
		// Auth required for this route, and user DOES NOT have auth
		next("/");
	}
	// Auth NOT required for this route OR Auth required for this route, and user has auth
	next();
});

export default router;
