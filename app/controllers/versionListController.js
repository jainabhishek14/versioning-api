"use strict";


const mongoose = require("mongoose");
const Version = mongoose.model("Version");
const params = require("../../config/params");


const  saveSection = (applicationID, entityID, section) => {
	return new Promise(function(resolve, reject){
		let newSection = new Version();
		newSection.application = applicationID;
		newSection.entity = entityID;
		newSection.data = section.data;
		newSection.parent = (section.hasOwnProperty("previousVersion")) ? section.previousVersion : undefined;
		newSection.save((err, sectionCreated) => {
			if(err){
				reject(err);
			}
			resolve(newSection._id);
		});
	});
};

const hasSectionError = async sections => {
	const validation = await sections.filter(section => {
		if(!section.isUpdated && !section.hasOwnProperty("previousVersion")){
			return true;
		}
	});
	return validation.length;
}

const saveSections = async (applicationID, entityID, sections) => {
	let assets = [];
	const validation = await hasSectionError(sections);
	if(validation){
		return false;
	}
	
	await sections.forEach(async section => {
		if(!section.hasOwnProperty('isUpdated') || section.isUpdated){
			await saveSection(applicationID, entityID, section)
			.then(function(sectionId){
				assets.push(sectionId);
			}, function(err){
				return false;
			});
		}else{
			assets.push(section.previousVersion);
		}
	});
	return assets;
};

const saveVersion = async (applicationID, entityID, previousVersion, sections) => {
	const assets = await saveSections(applicationID, entityID, sections);
	if(assets.length){
		let newVersion = new Version();
		newVersion.application = applicationID;
		newVersion.entity = entityID;
		newVersion.assets = assets;
		newVersion.parent = previousVersion;
		newVersion.save((err, versionCreated) => {
			if(err){
				return false;
			}
			return true;
		});	
	}
	return false;
}

exports.list_versions = (req, res) => {
	Version.aggregate([
		{
			$match: {
				$and: [{
					entity: req.params.entityID	
				},
				{
					application: req.params.applicationID
				}]
			}
		},
		{
			$graphLookup: {
				from: "versions",
				startWith: "$parent",
				connectFromField: "parent",
				connectToField: "_id",
				as: "parentHierarchy",
				maxDepth: 5
			}
		},
		{
			$sort: {
				dateAdded:  -1
			}
		}
		
	], (err, versions) => {
		if(err){
			res.status(803).json({message: err.message});
		}
		res.status(200).json(versions);
		return res;
	});
};

exports.create_version = (req, res) => {
	if(req.hasOwnProperty("body") && Object.keys(req.body).length){
		if(saveVersion(req.params.applicationID, req.params.entityID, req.body.previousVersion, req.body.sections)){
			return res.status(201).json({message: "Successful"});	
		}
		return res.status(400).json({message: "Invalid parameters"});	
	} else {
		return res.status(400).json({message: "Bad request. Post data not found"});	
	}
};


exports.get_asset_details = (req, res) => {
	Version.findById(req.params.id, (err, version) => {
		if(err){
			res.status(803).json({message: err.message});
		}	
		res.status(200).json(version);
	});
};
