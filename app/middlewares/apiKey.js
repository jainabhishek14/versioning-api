"use strict";

module.exports = (req, res, next) => {
	if(req.headers.hasOwnProperty("x-api-key") && req.headers["x-api-key"].trim().length){
		res.locals.application = req.headers["x-api-key"];
		return next();
	} else { 
		return res.status(400).json({"message": "Bad Request. API KEY missing"});
	}
};