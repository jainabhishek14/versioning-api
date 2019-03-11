"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var healthCheckSchema = new Schema({
	ipAddr: {
		type: Schema.Types.Mixed
	},
	date_added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("HealthCheck", healthCheckSchema);