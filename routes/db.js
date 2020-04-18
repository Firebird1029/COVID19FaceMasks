"use strict"; /* eslint-env node */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
const debug = !process.env.NODE_ENV;

// Load Node Dependencies & Custom Modules
var MongoClient = require("mongodb").MongoClient,
	utils = require("../utils.js");
