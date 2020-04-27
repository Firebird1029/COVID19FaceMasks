const mongoose = require("mongoose"),
	passport = require("passport"),
	jwt = require("jsonwebtoken"),
	Listing = mongoose.model("Listing");

// https://mongoosejs.com/docs/queries.html

// Retrieve/Fetch Listings -- GET
exports.retrieveListings = (req, res) => {
	Listing.find({}, (err, listings) => {
		if (err) {
			// Not sure why Listing.find would return an error, tbh
			res.status(400).send(err);
		} else {
			res.status(200).json(listings);
		}
	});
};

// Create Listing -- POST
exports.createListing = (req, res) => {
	const userErrors = [];
	// Make sure user filled out all required fields
	if (!req.body.name) userErrors.push("Missing mask name.");
	if (req.body.name && req.body.name.length > 0 && req.body.name.length < 7)
		userErrors.push("Mask name is too short.");

	if (userErrors.length >= 1) {
		res.status(422).json({ userErrors });
	} else {
		// Generate a nice url string
		const urlName =
			encodeURI(
				req.body.name
					.replace(/[^a-zA-Z ]/g, "")
					.replace(/\s+/g, "-")
					.toLowerCase()
					.substring(0, 30)
			) +
			"-" +
			Math.floor(Math.random() * 10000000000);

		const newListing = new Listing({ ...req.body, urlName });
		newListing.save((err, listing) => {
			if (err) {
				// i.e. not all required fields are filled out
				res.status(400).json({ userErrors: ["Unknown error when signing up. Please refresh and try again."] });
			} else {
				res.status(200).json(listing);
			}
		});
	}
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
