const mongoose = require("mongoose"),
	passport = require("passport"),
	jwt = require("jsonwebtoken"),
	User = mongoose.model("User");

// https://mongoosejs.com/docs/queries.html

// Find User via their JWT token -- GET
exports.findUser = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (err || !user) {
			return res.sendStatus(401);
			// .send(err ? err.message : "JWT invalid");
		} else {
			return res.status(200).json({
				auth: true,
				token: req.headers["authorization"].slice(7),
				// message: "User found",
				user
			});
		}
	})(req, res, next);
};

// Update User Profile -- PUT
exports.updateUser = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, userFromJWT) => {
		if (err || !userFromJWT) {
			return res.sendStatus(401);
		} else {
			const userErrors = [];
			// Make sure user filled out all required fields
			if (!req.body.firstName) userErrors.push("Missing first name.");
			if (!req.body.lastName) userErrors.push("Missing last name.");
			if (!req.body.phone) userErrors.push("Missing phone.");

			// If no use errors, then proceed to create user in database
			if (userErrors.length >= 1) {
				return res.status(422).json({ userErrors });
			} else {
				User.findOneAndUpdate(
					{ email: userFromJWT.email },
					{ firstName: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone },
					{ new: true },
					(err, newUserData) => {
						if (err) return res.status(400).send(err);
						return res.status(200).json({
							auth: true,
							token: req.headers["authorization"].slice(7),
							// message: "User found",
							user: newUserData
						});
					}
				);
			}
		}
	})(req, res, next);
};

// DELETE
exports.deleteUser = (req, res) => {
	User.findOneAndDelete()({ _id: req.params.userId }, (err, deletedUser) => {
		if (err) return res.status(400).send(err);
		return res.status(200).json(deletedUser);
	});
};

// Create User - POST
exports.createUser = (req, res, next) => {
	const userErrors = [];
	// Make sure user filled out all required fields
	if (!req.body.firstName) userErrors.push("Missing first name.");
	if (!req.body.lastName) userErrors.push("Missing last name.");
	if (!req.body.email) userErrors.push("Missing email.");
	if (!req.body.password) userErrors.push("Missing password.");
	if (req.body.password && req.body.password.length < 7) userErrors.push("Please choose a longer password.");
	if (!req.body.phone) userErrors.push("Missing phone.");

	// If no use errors, then proceed to create user in database
	if (userErrors.length >= 1) {
		return res.status(422).json({ userErrors });
	} else {
		// Check database to see user exists
		User.findOne({ email: req.body.email }).then((user) => {
			if (user) {
				// User already exists in database
				return res.status(409).json({ userErrors: ["Your account already exists. Please login instead."] });
			} else {
				// Generate hashed password via passportConfig.js
				passport.authenticate("register", (err, user) => {
					// Creating the user via Passport is pretty straightforward, there should be no errors
					if (err) {
						console.log("Error in passport.authenticate in exporst.createUser in userController.js", err);
						return res.status(400).json({
							userErrors: ["Unknown error when signing up. Please refresh and try again."]
						});
					} else {
						// User created successfully, req.login and send data back to client
						req.login(user, (reqErr) => {
							if (reqErr) {
								console.log("Error in req.login in exports.createUser in userController.js", reqErr);
								return res.status(400).json({
									userErrors: ["Unknown error when signing up. Please refresh and try again."]
								});
							} else {
								// return res.status(200).json(user);

								// Following Vue JWT tutorial, which sends JWT right after regristration
								const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
								return res.status(200).json({
									auth: true,
									// message: "user registered",
									token,
									user
								});
							}
						});
					}
				})(req, res, next);
			}
		});
	}
};

// Login a User -- POST
exports.loginUser = (req, res, next) => {
	const userErrors = [];
	// Make sure user filled out all required fields
	if (!req.body.email) userErrors.push("Missing email.");
	if (!req.body.password) userErrors.push("Missing password.");

	// If no user errors, proceed to login
	if (userErrors.length >= 1) {
		return res.status(422).json({ userErrors });
	} else {
		passport.authenticate("login", (err, user) => {
			if (err) {
				// If user not found in database or password incorrect. These errors come from passportConfig.js
				return res.status(401).json({ userErrors: [err.message] });
			} else {
				req.login(user, (reqErr) => {
					if (reqErr) {
						console.log("Error in req.login in exports.createUser in userController.js", reqErr);
						return res.status(400).json({
							userErrors: ["Unknown error when logging in. Please refresh and try again."]
						});
					} else {
						// User logged in successfully, send data back to client
						const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
						return res.status(200).json({
							auth: true,
							// message: "user found and logged in",
							token,
							user
						});
					}
				});
			}
		})(req, res, next);
	}
};
