"use strict";

const winston 									 = require("winston");
const fs 										 = require("fs");
const env 										 = process.env.NODE_ENV || "development";
const logDir 									 = "logs";

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new (require("winston-daily-rotate-file"))({
			filename: `${logDir}/application.log`,
			datePattern: "YYYY-MM-DD",
			prepend: true,
			level: env === "development" ? "verbose" : "info"
		})
	]
});

module.exports = logger;