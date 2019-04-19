"use strict";
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var versionSchema = new Schema({
	application: {
		type: String,
		required: "Application identifier is missing"
	},
	entity: {
		type: ObjectId,
		required: "Entity identifier is missing",
		ref: "Entity"
	},
	status: {
		type: String,
		enum: ["pending", "approve", "reject"],
		trim: true,
		index: true
	},
	isDraft: {
		type: Boolean	
	},
	isActive: {
		type: Boolean
	},
	addedBy: {
		id: {
			type: String,
			required: "Author identifier is missing"
		},
		name: {
			type: String,
			required: "Author Name is missing"
		}
	},
	reviewedBy: {
		id: {
			type: String
		},
		name: {
			type: String
		}
	},
	reviewedAt: {
		type: Date
	},
	data: {
		type: Map
	},
	assets: [{type: ObjectId, ref: "Version"}],
	parent: {
		type: ObjectId, 
		ref: "Version"
	}
}, { timestamps : { createdAt: "dateAdded", updatedAt: "dateUpdated" } });


versionSchema.pre("find", function(){
	this.populate("assets");
});

module.exports = mongoose.model("Version", versionSchema);
