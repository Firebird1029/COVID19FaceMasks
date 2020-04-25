const mongoose = require("mongoose"),
	passport = require("passport"),
	jwt = require("jsonwebtoken"),
	User = mongoose.model("User");

// https://mongoosejs.com/docs/queries.html

// GET
exports.listAllUsers = (req, res) => {
	User.find({}, (err, users) => {
		if (err) res.send(err);
		res.status(200).json(users);
	});
};

// POST
// exports.createUser = (req, res) => {
// 	const newUser = new User(req.body);
// 	newUser.save((err, user) => {
// 		if (err) res.send(err);
// 		res.status(200).json(user);
// 	});
// };

// GET
exports.readUser = (req, res) => {
	User.findById(req.params.userID, (err, user) => {
		if (err) res.send(err);
		res.status(200).json(user);
	});
};

// GET
exports.readUserByUsername = (req, res) => {
	User.findOne({ username: req.params.userID }, (err, user) => {
		if (err) res.send(err);
		res.status(200).json(user);
	});
};

// PUT
exports.updateUser = (req, res) => {
	User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
		if (err) res.send(err);
		res.status(200).json(user);
	});
};

// DELETE
exports.deleteUser = (req, res) => {
	User.findOneAndDelete()({ _id: req.params.userId }, (err, deletedUser) => {
		if (err) res.send(err);
		res.status(200).json(deletedUser);
	});
};

// Create User - POST
exports.createUser = (req, res, next) => {
	// Make sure user filled out all required fields
	if (!(req.body.username && req.body.password)) {
		// TODO add back in later:  && req.body.email && req.body.firstName && req.body.lastName && req.body.phone
		res.status(422).send("Not all required fields filled out");
	} else {
		// Check database to see if username already taken (or user exists)
		User.findOne({ username: req.body.username }).then((user) => {
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
							res.status(200).json(user);
						}
					});
				})(req, res, next);
			}
		});
	}
};

// Login a User -- POST
exports.loginUser = (req, res, next) => {
	// Make sure user filled out all required fields
	if (!(req.body.username && req.body.password)) {
		res.status(422).send("Not all required fields filled out");
	} else {
		passport.authenticate("login", (err, user) => {
			if (err) {
				res.status(401).send(err.message);
			} else {
				req.login(user, (reqErr) => {
					if (reqErr) {
						console.log("Error in req.login in exports.createUser in userController.js", reqErr);
					} else {
						const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET);
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
