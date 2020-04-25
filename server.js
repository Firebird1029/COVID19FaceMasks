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
	bodyParser = require("body-parser");

// Passport Config
require("./api/config/passportConfig.js");

// Models & Express Router
const User = require("./api/models/UserModel"),
	Listing = require("./api/models/ListingModel"),
	router = require("./api/routes/apiRoutes.js");

// Setup Express Middleware
debug && app.use(morgan("dev"));
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

// MongoDB Code
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set("debug", debug);

const db = mongoose.connection;
db.once("open", (_) => {
	debug && console.log("Database connected:", process.env.MONGO_URL.substring(process.env.MONGO_URL.indexOf("@")));
});

db.on("error", (err) => {
	debug && console.error("Database connection error:", err);
});
