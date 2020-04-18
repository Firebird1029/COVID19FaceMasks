"use strict"; /* eslint-env node */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
const debug = !process.env.NODE_ENV;
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
const express = require("express"),
	app = express(),
	server = app.listen(process.env.PORT || (process.argv[2] || 8000), () => {
		debug && console.log(server.address());
	}),

	// Express Middleware
	helmet = require("helmet"),
	bodyParser = require("body-parser"),
	// pugStatic = require("pug-static"),

	// Project-Specific Dependencies
	MongoClient = require("mongodb").MongoClient,
	// io = require("socket.io"),
	// listener = io.listen(server),

	// Utilities & Custom Modules
	utils = require("./utils.js");

// Setup Express Middleware
app.set("view engine", "pug");
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));

// app.use(pugStatic(__dirname + "/views"));
const router = require("./routes/routes.js");
app.use("/", router);

app.use((req, res, next) => {
	res.status(404).render("404.pug");
});

// MongoDB
// https://zellwk.com/blog/install-mongodb/
// https://zellwk.com/blog/crud-express-mongodb/
MongoClient.connect(process.env.mongoDBconnectionString, { useUnifiedTopology: true })
	.then(client => {
		debug && console.log("Connected to database: ", process.env.mongoDBconnectionString);
		const db = client.db("db-1");
	}).catch(err => console.error(err));

// Socket.io Control
// listener.sockets.on("connection", function connectionDetected (socket) {
// 	socket.emit("connected", {});
// });
