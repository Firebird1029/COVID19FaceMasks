const debug = !process.env.NODE_ENV;

const userBuilder = require("../controllers/userController"),
	listingBuilder = require("../controllers/listingController");

// Load Node Dependencies & Custom Modules
const express = require("express"),
	router = express.Router();

// User Functionality
router.route("/register").post(userBuilder.createUser);
router.route("/login").post(userBuilder.loginUser);
router
	.route("/thisUser")
	.get(userBuilder.findUser)
	.put(userBuilder.updateUser);

// Listing Functionality
// TODO jwt sign all these routes
router
	.route("/listings")
	.all(listingBuilder.confirmLoggedIn)
	.get(listingBuilder.retrieveListings)
	.post(listingBuilder.createListing);
router
	.route("/listings/:urlName")
	.get(listingBuilder.getListing)
	.all(listingBuilder.confirmLoggedIn);

module.exports = router;
