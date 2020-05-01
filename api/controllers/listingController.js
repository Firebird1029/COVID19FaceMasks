const mongoose = require("mongoose"),
	passport = require("passport"),
	jwt = require("jsonwebtoken"),
	formidable = require("formidable"),
	cloudinary = require("cloudinary").v2,
	Listing = mongoose.model("Listing");

// Setup Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET
});

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

// Get Listing -- GET
exports.getListing = (req, res) => {
	Listing.findOne({ urlName: req.params.urlName }, (err, listing) => {
		if (err) res.status(400).json({ userErrors: ["Unknown error occured."] });
		res.status(200).json(listing);
	});
};

// Create Listing -- POST
exports.createListing = (req, res) => {
	const userErrors = [];
	// Make sure user filled out all required fields
	if (!req.body.name) userErrors.push("Missing mask name.");
	if (req.body.name && req.body.name.length > 0 && req.body.name.length < 7)
		userErrors.push("Mask name is too short.");
	if (req.body.description && req.body.description.length > 300) userErrors.push("Description is too long.");

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
				// Could happen if user did not fill out all fields, but we check for that earlier
				res.status(400).json({ userErrors: ["Unknown error occured when creating listing."] });
			} else {
				res.status(200).json(listing);
			}
		});
	}
};

// GET
// exports.readListingByListingname = (req, res) => {
// 	Listing.findOne({ Listingname: req.params.ListingID }, (err, listing) => {
// 		if (err) res.status(400).send(err);
// 		res.status(200).json(listing);
// 	});
// };

// PUT
// exports.updateListing = (req, res) => {
// 	Listing.findOneAndUpdate({ _id: req.params.ListingId }, req.body, { new: true }, (err, listing) => {
// 		if (err) res.status(400).send(err);
// 		res.status(200).json(listing);
// 	});
// };

// Edit Listing -- POST (later PUT)
exports.editListing = (req, res) => {
	const form = formidable({ multiples: true });

	form.parse(req, (err, formFields, formFiles) => {
		if (err) {
			console.log(err);
			res.status(400).json({ userErrors: ["Unknown error occured when uploading image."] });
		} else {
			const listing = JSON.parse(formFields.listingData);

			// Upload Image to Cloudinary
			cloudinary.uploader
				.upload(formFiles.imageFile.path, {
					tags: "uploadV1.0.0", // arbitrary tag
					context: {
						// caption/alt are title/description, others are custom key: value
						caption: encodeURI(listing.name),
						listingID: encodeURI(listing._id),
						sewerID: encodeURI(listing.sewerID),
						sewerEmail: encodeURI(listing.sewerEmail),
						urlName: encodeURI(listing.urlName)
					}
				})
				.then(function(image) {
					// image.url, image.public_id

					// Store url to image on Cloudinary to MongoDB
					Listing.findOneAndUpdate(
						{ _id: listing._id }, // Find listing by its ID, passed as a "field" in the form-data
						{ img: image.url }, // The data to change in the document
						{ new: true }, // Return the new document
						(err, listing) => {
							if (err)
								res.status(400).json({ userErrors: ["Unknown error occured when uploading image."] });
							res.sendStatus(200);
						}
					);
				})
				.catch(function(err) {
					res.status(400).json({ userErrors: ["Unknown error occured when uploading image."] });
				});
		}
	});
};

// DELETE
exports.deleteListing = (req, res) => {
	Listing.findOneAndDelete()({ _id: req.params.ListingId }, (err, deletedListing) => {
		if (err) res.status(400).send(err);
		res.status(200).json(deletedListing);
	});
};
