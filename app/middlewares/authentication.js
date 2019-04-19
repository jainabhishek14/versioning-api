"use strict";
const axios = require("axios");
const https = require("https");
const params = require("../../config/params");

module.exports = function(req, res, next){
	if(params.unsecuredPath.indexOf(req.path) === -1){
		if(req.headers.hasOwnProperty("authorization")){
			axios.post(params.authenticationUrl, {
				token: req.headers.authorization	
			}, {
				headers: {
					Authorization: req.headers.authorization,
					"Content-Type":"application/json"
				},
				httpsAgent: new https.Agent({
					rejectUnauthorized: params.sslVerify || false
				})
			})
				.then(response => {
					res.locals.tokenData = response.data;
					next();
				})
				.catch(err => {
					console.log("Error: ", err.response);
					console.log("Error Message: ", err.response.data.message);
					res.status(703).json({message: "Invalid Token."});
				});
			return res;
		}
		return res.status(701).json({message: "Token required."});
	} else{
		next();
	}
};