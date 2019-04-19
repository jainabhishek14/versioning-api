"use strict";

module.exports = {
	authenticationUrl: process.env.AUTH_URI || "https://gw-wns.com/api/dev/ms-pyt-validatetoken-0011/1/validatetoken",
	unsecuredPath: ["/health", "/logs"],
	reviewActions: ["approve", "reject"],
	sslVerify: false,
	limitNumResults : 100,
	tokenData: {
		user: {
			id: "6872528354823548735248325",
			name: "Abhishek Jain",
			permissions: {
				read: true,
				write: true,
				delete: true,
				review: true
			}
		}
	}
};