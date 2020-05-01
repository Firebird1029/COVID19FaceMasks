const debug = !process.env.NODE_ENV;

const userBuilder = require("../controllers/userController"),
	listingBuilder = require("../controllers/listingController");

// Load Node Dependencies & Custom Modules
const express = require("express"),
	router = express.Router();

// router
// 	.route("/users")
// 	.get(userBuilder.listAllUsers)
// 	.post(userBuilder.createUser);

// router
// 	.route("/users/:userID")
// 	// .get(userBuilder.readUser)
// 	.get(userBuilder.readUser)
// 	.put(userBuilder.updateUser)
// 	.delete(userBuilder.deleteUser);

// User Functionality
router.route("/register").post(userBuilder.createUser);
router.route("/login").post(userBuilder.loginUser);
router.route("/findUser").get(userBuilder.findUser);

// Listing Functionality
// TODO jwt sign all these routes
router
	.route("/listings")
	.get(listingBuilder.retrieveListings)
	.post(listingBuilder.createListing);

router.route("/listings/uploadImage").post(listingBuilder.editListing);
router.route("/listings/:urlName").get(listingBuilder.getListing);

module.exports = router;
