"use strict";
const logs		 	 = require("../controllers/logsController");

const isJSON = str => {
	try{
		return (JSON.parse(str) && !!str);
	} catch {
		return false
	}
};

exports.unknownMethodHandler = function(req, res, next){
	logs.logRequests("info","Unknown Method.");
	res.status(404).json({"message": "Endpoint not found"});
};

exports.errorHandler = (err, req, res, next) => {
	logs.logRequests("error",err.stack);
	if(isJSON(req.body)){
		return next();	
	} else{ 
		return res.status(400).json({message: "Not a valid json request."});
	}
	res.status(500).json({"message": "Internal Server Error."});
};