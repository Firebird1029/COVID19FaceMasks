const debug = !process.env.NODE_ENV;

const userBuilder = require("../controllers/userController");

// Load Node Dependencies & Custom Modules
const express = require("express"),
	router = express.Router();

router
	.route("/users")
	.get(userBuilder.listAllUsers)
	.post(userBuilder.createUser);

router
	.route("/users/:userID")
	// .get(userBuilder.readUser)
	.get(userBuilder.readUserByUsername)
	.put(userBuilder.updateUser)
	.delete(userBuilder.deleteUser);

router.route("/register").post(userBuilder.createUser);

module.exports = router;
