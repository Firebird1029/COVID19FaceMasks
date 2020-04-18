"use strict"; /* eslint-env node */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
const debug = !process.env.NODE_ENV;

// Load Node Dependencies & Custom Modules
const express = require("express"),
	router = express.Router(),
	// MongoClient = require("mongodb").MongoClient,
	mongoose = require("mongoose"),
	utils = require("../utils.js");

module.exports = router;

router.get("/", (req, res) => {
	res.render("index.pug", {
		options: {}
	});
});

// MongoDB
// Later move to db.js
// https://zellwk.com/blog/install-mongodb/
// https://zellwk.com/blog/crud-express-mongodb/

// MongoClient.connect(process.env.mongoDBconnectionString, { useUnifiedTopology: true })
// 	.then(client => {
// 		debug && console.log("Connected to database: ", process.env.mongoDBconnectionString);
// 		const db = client.db("db-1");
// 	}).catch(err => console.error(err));

mongoose.connect(process.env.mongoDBconnectionString, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', process.env.mongoDBconnectionString)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const Schema = mongoose.Schema

const schema = new Schema({
  // ...
})