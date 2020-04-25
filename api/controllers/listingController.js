const mongoose = require("mongoose"),
	passport = require("passport"),
	jwt = require("jsonwebtoken"),
	Listing = mongoose.model("Listing");

// https://mongoosejs.com/docs/queries.html

// GET
exports.listAllListings = (req, res) => {
	Listing.find({}, (err, listings) => {
		if (err) res.status(400).send(err);
		res.status(200).json(listings);
	});
};

// POST
exports.createListing = (req, res) => {
	const newListing = new Listing(req.body);
	newListing.save((err, listing) => {
		if (err) {
			// i.e. not all required fields are filled out
			res.status(422).send(err);
		} else {
			res.status(200).json(listing);
		}
	});
};

// GET
exports.readListingByID = (req, res) => {
	Listing.findById(req.params.ListingID, (err, listing) => {
		if (err) res.status(400).send(err);
		res.status(200).json(listing);
	});
};

// GET
// exports.readListingByListingname = (req, res) => {
// 	Listing.findOne({ Listingname: req.params.ListingID }, (err, listing) => {
// 		if (err) res.status(400).send(err);
// 		res.status(200).json(listing);
// 	});
// };

// PUT
exports.updateListing = (req, res) => {
	Listing.findOneAndUpdate({ _id: req.params.ListingId }, req.body, { new: true }, (err, listing) => {
		if (err) res.status(400).send(err);
		res.status(200).json(listing);
	});
};

// DELETE
exports.deleteListing = (req, res) => {
	Listing.findOneAndDelete()({ _id: req.params.ListingId }, (err, deletedListing) => {
		if (err) res.status(400).send(err);
		res.status(200).json(deletedListing);
	});
};
