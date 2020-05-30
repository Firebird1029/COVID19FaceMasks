import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		// TODO change /home to / then add meta needs auth, then call next() if not logged in
		path: "/home",
		name: "home",
		meta: { title: "Home", requiresAuth: true },
		component: () => import("@/views/Home.vue")
	},
	{
		path: "/",
		name: "launch",
		meta: { title: "Home" },
		component: () => import("@/views/Launch.vue")
	},
	{
		path: "/login",
		name: "login",
		meta: { title: "Login" },
		component: () => import("@/views/Login.vue")
	},
	{
		path: "/register",
		name: "register",
		meta: { title: "Register" },
		component: () => import("@/views/Register.vue")
	},
	{
		path: "/my-masks",
		name: "my-listings",
		meta: { title: "My Listings", requiresAuth: true },
		component: () => import("@/views/MyListings.vue")
	},
	{
		path: "/listing/create",
		name: "create-listing",
		meta: { title: "Create Listing", requiresAuth: true },
		component: () => import("@/views/CreateListing.vue")
	},
	{
		path: "/listing/:urlName",
		name: "listing",
		props: true,
		meta: { title: "Listing", requiresAuth: false },
		component: () => import("@/views/Listing.vue")
	},
	{
		path: "/edit-profile",
		name: "edit-profile",
		props: true,
		meta: { title: "Profile", requiresAuth: true },
		component: () => import("@/views/EditProfile.vue")
	},
	// {
	// 	path: "/profile/:id",
	// 	name: "profile",
	// 	props: true,
	// 	component: () => import("@/views/Profile.vue")
	// },
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
	// Add Document Title
	document.title = (to.meta.title ? to.meta.title + " - " : "") + "Face Masks";

	// Auth
	const loggedIn = localStorage.getItem("savedUserData");
	if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
		// Auth required for this route, and user DOES NOT have auth
		next("/login");
	}
	// Auth NOT required for this route OR Auth required for this route, and user has auth
	next();
});

export default router;
