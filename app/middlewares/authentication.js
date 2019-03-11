"use strict";
const axios = require("axios");
const params = require("../../config/params");

module.exports = function(req, res, next){
	if(process.env.NODE_ENV === "production" && params.unsecuredPath.indexOf(req.path) === -1){
		if(req.headers.hasOwnProperty("authorization")){
			const isValidRequest = axios.post(params.authenticationUrl, {
				token: req.headers.authorization	
			}, {
				headers: {Authorization: req.headers.authorization}
			})
				.then(res => {
					console.log("Response: ", res.data.payload);
					return next();
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