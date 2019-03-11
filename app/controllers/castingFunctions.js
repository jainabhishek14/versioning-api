"use strict";

exports.castToNumber = value => {
	if(!isNaN(parseInt(value, 10))){
		return parseInt(value, 10);	
	}
	return value;
};

exports.castToBoolean = value => {
	if(typeof value === "string"){
		if(value.toLowerCase() === "true"){
			return true;
		} else if(value.toLowerCase() === "false"){
			return false;
		}
	}
	return value;
};

exports.castToString = value => {
	return value.toString();
};

exports.castToDate = value => {
	return new Date(value);
};
