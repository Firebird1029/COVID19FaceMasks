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
	sewerUsername: {
		type: String,
		required: true
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
