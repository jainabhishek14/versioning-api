"use strict";
let mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;
let Schema = mongoose.Schema;

let entitySchema = new Schema({
	application: {
		type: String,
		required: "Application identifier is missing",
		index: true
	},
	head: {
		type: ObjectId,
		ref: "Version"
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true,
		index: true
	},
	approvedVersion: {
		type: ObjectId,
		ref: "Version",
		default: null
	},
	addedBy: {
		id: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}

	}
}, { timestamps : { createdAt: "dateAdded", updatedAt: "dateUpdated" } });
	
module.exports = mongoose.model("Entity", entitySchema);
