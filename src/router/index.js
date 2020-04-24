import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		// TODO change /home to / then add meta needs auth, then call next() if not logged in
		path: "/home",
		name: "home",
		component: () => import("../views/Home.vue")
	},
	{
		path: "/",
		name: "launch",
		component: () => import("../views/Launch.vue")
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/Login.vue")
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/Register.vue")
	},
	{
		path: "/profile/:username",
		name: "profile",
		props: true,
		component: () => import("../views/Profile.vue")
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

export default router;
