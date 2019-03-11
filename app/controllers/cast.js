"use strict";

const castingFunctions = require("./castingFunctions");
const params = require("../../config/params");

function cast(value, type){
	return castingFunctions["castTo"+type](value);
}


function castValue (field, value) {
	if(Object.keys(params.newsFields).indexOf(field)){
		return cast(value, params.newsFields[field]);
	}
	return value;
}

exports.parseValue = (field, value) => {
	if (typeof value === "string") {
		return castValue(field, value);
	}
	else if (Array.isArray(value)) {
		var array = [];
		value.forEach(function(item, itemKey) {
			array[itemKey] = parseValue(itemKey, item);
		});
		return array;
	}
	return value;
};