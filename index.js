"use strict"; /* eslint-env node */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
var debug = false;
console.log("Environment: ", process.env.NODE_ENV || "dev");
console.log("Debugging: ", debug);

/*
 * Notes
 *
 * Resources:
 * https://bulma.io/documentation/
 * https://pugjs.org/api/getting-started.html
 * https://fontawesome.com/icons
 */

// Load Node Dependencies & Custom Modules
var express = require("express"),
	app = express(),
	server = app.listen(process.env.PORT || (process.argv[2] || 8000), () => {
		debug && console.log(server.address());
	}),

	// Express Middleware
	helmet = require("helmet"),
	pugStatic = require("pug-static"),

	// Project-Specific Dependencies
	io = require("socket.io"),
	listener = io.listen(server),

	// Utilities & Custom Modules
	utils = require("./utils.js");

// Setup Express Middleware
app.set("view engine", "pug");
app.use(helmet());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));

app.use(pugStatic(__dirname + "/views"));
// var router = require("./routes/routes.js");
// app.use("/", router);

app.use((req, res, next) => {
	res.status(404).render("404.pug");
});

// Socket.io Control
// listener.sockets.on("connection", function connectionDetected (socket) {
// 	socket.emit("connected", {});
// });
