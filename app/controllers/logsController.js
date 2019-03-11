"use strict";

const uuid 				= require("node-uuid");
const moment 			= require("moment");
const logger		 	= require("../middlewares/logger");

exports.logRequests = (type, message = "") => {
	return (req, res, next) => {
		logger.log({
			timestamp: moment(),
			id: uuid.v4(),
			service: process.env.SERVICE_ID,
			version: process.env.VERSION_ID,
			level: type,
			remoteAddr: (req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0],
			method: req.method,
			url: req.url,
			httpVersion: req.httpVersion,
			authorizationToken: req.headers.authorization,
			referrer: req.headers.referrer || req.headers.referer || "",
			userAgent: req.headers["user-agent"],
			requestParams: req.params,
			requestQuery: req.query,
			message: message
		});
		return next();
	};
};


exports.retrieveLogs = (req, res) => {
	const options = {
		from: moment(req.query.from).format("x"),
		until: moment().format("x"),
		limit: 10,
		start: 0,
		order: "desc",
	};

	//
	// Find items logged between today and yesterday.
	// hold till following issue is closed.
	// https://github.com/winstonjs/winston/issues/1130
	//
	logger.query(options, function (err, results) {
		if (err) {
			console.log(err.stack);
			throw err;
		}
		console.log(results);
	});
};