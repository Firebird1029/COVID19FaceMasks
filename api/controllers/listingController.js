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
		if (err) res.status(400).json({ userErrors: ["Unknown error occured."], serverErrors: [err] });
		res.status(200).json(listing);
	});
};

// Create Listing -- POST
exports.createListing = (req, res) => {
	const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024 });

	form.parse(req, (err, formFields, formFiles) => {
		const listingFormData = JSON.parse(formFields.listingFormData);

		// Make sure user filled out all required fields
		const userErrors = [];
		if (!listingFormData.name) userErrors.push("Missing mask name.");
		if (listingFormData.name && listingFormData.name.length > 0 && listingFormData.name.length < 7)
			userErrors.push("Mask name is too short.");
		if (listingFormData.description && listingFormData.description.length > 300)
			userErrors.push("Description is too long.");
		// Picture stuff here
		if (!formFiles.imageFile) userErrors.push("Image required.");
		if (formFiles.imageFile && formFiles.imageFile.size > 3 * 1024 * 1024)
			userErrors.push("Image file size cannot exceed 3 MB.");

		if (userErrors.length >= 1) {
			res.status(422).json({ userErrors });
		} else {
			// No unfilled required fields from this point on
			// Generate a nice url string
			const urlName =
				encodeURI(
					listingFormData.name
						.replace(/[^a-zA-Z ]/g, "")
						.replace(/\s+/g, "-")
						.toLowerCase()
						.substring(0, 30)
				) +
				"-" +
				Math.floor(Math.random() * 10000000000);

			// Upload Image to Cloudinary
			cloudinary.uploader
				.upload(formFiles.imageFile.path, {
					// tags: "uploadV1.0.0",
					context: {
						// caption/alt are title/description, others are custom key: value
						caption: encodeURI(listingFormData.name),
						listingID: encodeURI(listingFormData._id),
						sewerID: encodeURI(listingFormData.sewerID),
						sewerEmail: encodeURI(listingFormData.sewerEmail),
						urlName: encodeURI(listingFormData.urlName)
					}
				})
				.then(function(image) {
					// Upload finished, now store listing to database
					const newListing = new Listing({
						...listingFormData,
						urlName,
						img: image.url,
						imgID: image.public_id
					});
					newListing.save((err, listing) => {
						if (err) {
							// Could happen if user did not fill out all fields, but we check for that earlier
							res.status(400).json({
								userErrors: ["Unknown error occured when creating listing."],
								serverErrors: [err]
							});
						}
						res.status(200).json(listing);
					});
				})
				.catch(function(err) {
					res.status(400).json({
						userErrors: ["Unknown error occured when uploading image."],
						serverErrors: [err]
					});
				});
		}
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
// exports.updateListing = (req, res) => {
// 	Listing.findOneAndUpdate({ _id: req.params.ListingId }, req.body, { new: true }, (err, listing) => {
// 		if (err) res.status(400).send(err);
// 		res.status(200).json(listing);
// 	});
// };

// DELETE
exports.deleteListing = (req, res) => {
	Listing.findOneAndDelete()({ _id: req.params.ListingId }, (err, deletedListing) => {
		if (err) res.status(400).send(err);
		res.status(200).json(deletedListing);
	});
};
