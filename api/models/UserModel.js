const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false // TODO change to true
	},
	firstName: {
		type: String,
		required: false // TODO change to true
	},
	lastName: {
		type: String,
		required: false // TODO change to true
	},
	phone: {
		type: String,
		required: false // TODO change to true
	}
});

module.exports = mongoose.model("User", userSchema);
