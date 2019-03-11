"use strict";

module.exports = (req, res, next) => {
	if(["POST", "PUT"].indexOf(req.method) === -1 || req.is("json") === "json" ){
		return next();	
	} else { 
		return res.status(400).json({"message": "Bad Request. Header Issue"});
	}
};