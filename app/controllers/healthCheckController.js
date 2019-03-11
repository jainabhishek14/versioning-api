"use strict";

var mongoose = require("mongoose");
var healthCheck = mongoose.model("HealthCheck");


exports.check = (req, res) => {
	let data = {};
	data["ipAddr"] = (req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
	const check = new healthCheck(data);
	check.save( (err, healthLog) => {
		if(err){
			res.status(801).json({message: "Database error"});
		}
		res.status(200).json(healthLog);
	});
};