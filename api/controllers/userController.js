const mongoose = require("mongoose"),
	passport = require("passport"),
	jwt = require("jsonwebtoken"),
	User = mongoose.model("User");

// https://mongoosejs.com/docs/queries.html

// GET
exports.listAllUsers = (req, res) => {
	User.find({}, (err, users) => {
		if (err) res.status(400).send(err);
		res.status(200).json(users);
	});
};

// POST
// exports.createUser = (req, res) => {
// 	const newUser = new User(req.body);
// 	newUser.save((err, user) => {
// 		if (err) res.status(400).send(err);
// 		res.status(200).json(user);
// 	});
// };

// GET
exports.readUser = (req, res) => {
	User.findById(req.params.userID, (err, user) => {
		if (err) res.status(400).send(err);
		res.status(200).json(user);
	});
};

// GET ---- ????????
// exports.readUserByEmail = (req, res) => {
// 	User.findOne({ email: req.params.userID }, (err, user) => {
// 		if (err) res.status(400).send(err);
// 		res.status(200).json(user);
// 	});
// };

// PUT
exports.updateUser = (req, res) => {
	User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
		if (err) res.status(400).send(err);
		res.status(200).json(user);
	});
};

// DELETE
exports.deleteUser = (req, res) => {
	User.findOneAndDelete()({ _id: req.params.userId }, (err, deletedUser) => {
		if (err) res.status(400).send(err);
		res.status(200).json(deletedUser);
	});
};

// Create User - POST
exports.createUser = (req, res, next) => {
	// Make sure user filled out all required fields
	if (!(req.body.email && req.body.password)) {
		// TODO add back in later:  && req.body.email && req.body.firstName && req.body.lastName && req.body.phone
		res.status(422).send("Not all required fields filled out");
	} else {
		// Check database to see user exists
		User.findOne({ email: req.body.email }).then((user) => {
			if (user) {
				// User already exists in database
				res.status(409).send("User already exists");
			} else {
				// Generate hashed password via passportConfig.js
				passport.authenticate("register", (err, user) => {
					if (err)
						console.log("Error in passport.authenticate in exporst.createUser in userController.js", err);

					req.login(user, (reqErr) => {
						if (reqErr) {
							console.log("Error in req.login in exports.createUser in userController.js", reqErr);
						} else {
							// res.status(200).json(user);

							// Following Vue JWT tutorial, which sends JWT right after registration
							const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
							res.status(200).json({
								auth: true,
								message: "user registered",
								token,
								user
							});
						}
					});
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
	if (userErrors.length >= 1) {
		res.status(422).json({ userErrors });
	} else {
		passport.authenticate("login", (err, user) => {
			if (err) {
				// If user not found in database or password incorrect. These errors come from passportConfig.js
				res.status(401).json({ userErrors: [err.message] });
			} else {
				req.login(user, (reqErr) => {
					if (reqErr) {
						console.log("Error in req.login in exports.createUser in userController.js", reqErr);
						res.status(400).json({
							userErrors: ["Unknown error when logging in. Please refresh and try again."]
						});
					} else {
						const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
						res.status(200).json({
							auth: true,
							message: "user found and logged in",
							token,
							user
						});
					}
				});
			}
		})(req, res, next);
	}
};

// Find Users -- ????
exports.findUser = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (err || !user) {
			res.status(400).send(err ? err.message : "JWT invalid");
		} else {
			res.status(200).json({
				auth: true,
				message: "User found",
				user
			});
		}
	})(req, res, next);
};
