"use strict";

module.exports = {
	authenticationUrl: process.env.AUTH_URI,
	unsecuredPath: ["/health", "/logs"],
	limitNumResults : 100
};
