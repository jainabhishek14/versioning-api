"use strict";

module.exports = {
	authenticationUrl: process.env.AUTH_URI || "https://gw-wns.com/api/dev/ms-pyt-validatetoken-0011/1/validatetoken/",
	unsecuredPath: ["/health", "/logs"],
	limitNumResults : 100
};