const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const listingSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: false // TODO pic needed? and change to buffer not string
	},
	description: {
		type: String,
		required: false
	},
	sewerID: {
		type: String,
		required: true
	},
	sewerEmail: {
		type: String,
		required: true
	},
	sewerFirstName: {
		type: String
	},
	sewerLastName: {
		type: String
	},
	urlName: {
		type: String,
		required: true,
		unique: true
	},
	creationDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Listing", listingSchema);
