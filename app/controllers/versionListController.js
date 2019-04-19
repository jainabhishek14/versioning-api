"use strict";

const mongoose = require("mongoose");
const Version = mongoose.model("Version");
const Entity = mongoose.model("Entity");
const params = require("../../config/params");

const saveVersion = (data, isDocument = false) => {
	return new Version(data).save()
	.then(versionCreated => (isDocument) ? 
		Entity.updateOne({"_id": data.entity}, {head: versionCreated._id})
			.exec()
			.then(entityUpdated => data.entity)
			.catch(err => console.log(err)) : 
		versionCreated._id)
	.catch(err => {
		console.log(err);
		return false;
	});
};

const saveSection = (application, entity, addedBy, data) => {
	let sectionData = {
		application: application,
		entity: entity,
		addedBy: addedBy,
		data: data
	};
	return saveVersion(sectionData);
}

const saveSections = params => {
	const {application, entity, sections, addedBy, newSections} = params;
	let updatedContent = (sections && sections.length) ? sections.filter(section => "data" in section) : new Array();
	let sectionsToBeInserted = newSections;
	if(updatedContent.length){
		updatedContent.forEach((content, index) => {
			sectionsToBeInserted.push(content.data);
		});
	}
	let assets = new Array();
	const allSectionsCompleted = new Promise((resolve, reject) => {
		sectionsToBeInserted.forEach(async (section, index) => {
			const sectionId = await saveSection(application, entity, addedBy, section);
			if(sectionId){
				assets.push(sectionId._id);
			}
			if(index === sectionsToBeInserted.length -1){
				resolve(assets);
			}
		});
	});
	return allSectionsCompleted.then(assets => assets).catch(err => console.log(err));
};

exports.changeStatusOfEntityVersion = (id, status) => {
	Version.findOne({_id: req.params.id, application: res.locals.application}, (err, result) => {
		if(err){
			console.log(err);
		}
		
		if(result){
			result.reviewedBy = null;
			result.status = status;
			result.reviewedAt = null;
			result.markModified("reviewedAt");
			return result.save().exec();
		}
	});
};

exports.checkExistenceOfVersion = async parameters => {
	return Version.findOne(params).populate({path: 'entity', match: {_id: params.entity}}).exec();
};

exports.saveEntityVersion = async params => {
	const assets = await saveSections(params);
	if("sections" in params && params.sections){
		params.sections.forEach(section => {
			if(! ("data") in section){
				assets.push(section.id);
			}
		});
	}
	let data = {};
	if(assets.length){
		const { application, entity, addedBy, parent, sections, isDraft, isActive, status } = params;
		data['application'] = application;
		data['entity'] = entity;
		data['addedBy'] = addedBy;
		data['parent'] = parent;
		data['assets'] = assets;
		data['isDraft'] = isDraft;
		data['isActive'] = isActive;
		data['status'] = status;
		return saveVersion(data, true);
	} else{
		return false;	
	}
};

exports.list_versions = (req, res) => {
	Version.aggregate([
		{
			$match: {
				$and: [{
					entity: req.params.entityID	
				},
				{
					application: res.locals.application
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

exports.get_asset_details = (req, res) => {
	Version.findById(req.params.id, (err, version) => {
		if(err){
			res.status(803).json({message: err.message});
		}
		res.status(200).json(version);
	});
};

exports.reviewVersion = (req, res) => {
	if(params.reviewActions.indexOf(req.params.action) !== -1){
		Version.findOne({_id: req.params.id, application: res.locals.application, status: "pending"}, (err, result) => {
			if(err){
				return res.status(500).json({message: err.message});
			}
			if(result){
				result.reviewedBy = {
					id: res.locals.tokenData.user.id,
					name: res.locals.tokenData.user.name
				};
				result.status = req.params.action;
				result.reviewedAt = new Date();
				result.markModified("reviewedAt");
				result.save((err, version) => {
					if(err){
						res.status(500).json({message: err});	
					}
					if(req.params.action === "approve"){
						Entity.findOneAndUpdate({_id: version.entity}, {approvedVersion: version._id}, (err, entity) => {
							if(err){
								res.status(400).json({message: err});
							}
							res.status(201).json({message: "version Successfully reviewed"});
						});
					}
				});
			} else {
				res.status(404).json({message: "Version not found."})
			}
		});
	} else{
		res.status(400).json({message: "Invalid review action. Please refer documentation"});
	}
}
