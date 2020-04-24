const mongoose = require("mongoose");
const User = mongoose.model("User");

// https://mongoosejs.com/docs/queries.html

// GET
exports.listAllUsers = (req, res) => {
	User.find({}, (err, users) => {
		if (err) res.send(err);
		res.json(users);
	});
};

// POST
exports.createUser = (req, res) => {
	const newUser = new User(req.body);
	newUser.save((err, user) => {
		if (err) res.send(err);
		res.json(user);
	});
};

// GET
exports.readUser = (req, res) => {
	User.findById(req.params.userID, (err, user) => {
		if (err) res.send(err);
		res.json(user);
	});
};

// GET
exports.readUserByUsername = (req, res) => {
	User.findOne({ username: req.params.userID }, (err, user) => {
		if (err) res.send(err);
		res.json(user);
	});
};

// PUT
exports.updateUser = (req, res) => {
	User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
		if (err) res.send(err);
		res.json(user);
	});
};

// DELETE
exports.deleteUser = (req, res) => {
	User.findOneAndDelete()({ _id: req.params.userId }, (err, deletedUser) => {
		if (err) res.send(err);
		res.json(deletedUser);
	});
};
