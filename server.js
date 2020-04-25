const debug = !process.env.NODE_ENV;
console.log("Environment: ", process.env.NODE_ENV || "dev");
console.log("Debugging: ", debug);

const express = require("express"),
	app = express(),
	server = app.listen(process.env.PORT || process.argv[2] || 3000, () => {
		debug && console.log(server.address());
	}),
	morgan = require("morgan"),
	mongoose = require("mongoose"),
	history = require("connect-history-api-fallback"),
	helmet = require("helmet"),
	cors = require("cors"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	session = require("express-session");

// Config
require("./api/config/passportConfig.js");

// Models
// global.Task = require("./api/models/taskModel");
const User = require("./api/models/UserModel");

const router = require("./api/routes/apiRoutes.js");

// Setup Express Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing (Order Matters)
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use("/api", router);
app.use(history());

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set("debug", debug);

const db = mongoose.connection;
db.once("open", (_) => {
	console.log("Database connected:", process.env.MONGO_URL.substring(process.env.MONGO_URL.indexOf("@")));
});

db.on("error", (err) => {
	console.error("Database connection error:", err);
});
