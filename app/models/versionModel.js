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
		type: String,
		required: "Entity identifier is missing"
	},
	data: {
		type: Object
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
