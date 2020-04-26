const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
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
	},
	joinDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("User", userSchema);
