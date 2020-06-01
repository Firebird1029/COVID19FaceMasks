const debug = !process.env.NODE_ENV;
console.log("Environment: ", process.env.NODE_ENV || "dev");
console.log("Debugging: ", debug);

/*
 * Resources
 * https://alohanotcorona.org/index.html
 * https://www.signupgenius.com/go/30e0b49aaac2ea7fd0-mask
 * https://docs.google.com/forms/d/e/1FAIpQLSfxPf6V3TXWffLbcaZFkipUAr1qu2k-hVYfix2ZS17ReAFxtw/viewform
 * https://www.facebook.com/groups/Masks4Hawaii
 * https://alohamask.org/resources/
 * https://www.masks4hi.com/
 */

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
	router = require("./api/routes/apiRouter.js");

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
mongoose.set("useCreateIndex", true); // https://github.com/Automattic/mongoose/issues/6890
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set("debug", debug);

const db = mongoose.connection;
db.once("open", (_) => {
	debug && console.log("Database connected:", process.env.MONGO_URL.substring(process.env.MONGO_URL.indexOf("@")));
});

db.on("error", (err) => {
	debug && console.error("Database connection error:", err);
});

// using Twilio SendGrid's v3 Node.js Library -- TODO
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
// 	to: "brandon.yee150@gmail.com",
// 	from: "byee20@punahou.edu",
// 	subject: "Sending with Twilio SendGrid is Fun",
// 	text: "and easy to do anywhere, even with Node.js",
// 	html: "<strong>and easy to do anywhere, even with Node.js</strong>"
// };
// sgMail
// 	.send(msg, (err, result) => {
// 		console.log("err1", JSON.stringify(err));
// 		console.log("result1", result);
// 	})
// 	.catch((err) => console.log("err", err));
// console.log(process.env.SENDGRID_API_KEY);
