"use strict";


const mongoose = require("mongoose");
const Entity = mongoose.model("Entity");
const versionController = require("./versionListController");
const params = require("../../config/params");


const checkExistenceOfEntityVersion = params => {
	let receivedSections = new Array();
	params.sections.forEach(section => {
		receivedSections.push(section.id);
	});

	return versionController.checkExistenceOfVersion({entity: params.entity, application: params.application, isActive: {$exists: 1}, assets: {$all: receivedSections}})
		.then(version => version)
		.catch(err => console.log("err",err));
};

const prepareEntityVersionData = async (application, entity, author, sections, isDraft, isActive, status, newSections, isNew) => {
	const versionData = {
		application: application,
		entity: entity,
		addedBy: author,
		sections: sections,
		isDraft: isDraft,
		isActive: isActive,
		status: status,
		newSections: newSections
	};
	// Check content updation in existing sections 
	if(sections && sections.length && sections.some(section => "data" in section)){
		// check entity existence based on previous sections
		var checkExistence = false;
		if(!isNew){
			checkExistence = await checkExistenceOfEntityVersion(versionData);
		}
		if(checkExistence !== null && newSections && !newSections.length){
			return versionController.changeStatusOfEntityVersion(checkExistence._id, "pending");
		}
	}
	return versionController.saveEntityVersion(versionData);
};

const saveEntity = async params => {
	const {application, entity, actionType, sections, author, status, isNew, newSections} = params;
	let entityID = entity;

	if(isNew){
		const entityObj = new Entity({
			application: application,
			addedBy: author,
			status: status
		});
		if(entityObj.save()){
			entityID = entityObj._id;
		}else{
			return false;
		}
	}
	return await prepareEntityVersionData(application, entityID, author, sections, actionType === "draft", true, status, newSections, isNew);
};

exports.create_entity = async (req, res) => {
	if(req.hasOwnProperty("body") && Object.keys(req.body).length){
		const {previousVersion, actionType, sections, newSections} = req.body;
			const params = {
				application: res.locals.application,
				actionType: actionType,
				sections: sections,
				author: {
					id: res.locals.tokenData.user.id,
					name: res.locals.tokenData.user.name
				},
				newSections: newSections,
				status: "pending",
				isNew: true
			}; 

		if(await saveEntity(params)){
			return res.status(201).json({message: "Successful"});	
		}
		return res.status(400).json({message: "Invalid parameters"});
	} else {
		return res.status(400).json({message: "Bad request. Post data not found"});	
	}
};

exports.get_entity = (req, res) => {
	Entity.find({_id: req.params.id, application: res.locals.application}).populate("approvedVersion").exec((err, version) => {
		if(err){
			res.status(803).json({message: err.message});
		}	
		res.status(200).json(version);
	});
};

exports.delete_entity = (req, res) => {
	Entity.findOneAndUpdate({id: req.params.id, isActive: true, application: res.locals.application}, {isActive: false}, (err, entity) => {
		if(err) {
			res.status(500).json({message: err.message})
		}
		res.status(201).json({message: "Deleted Successfully."});
	});
};

exports.update_entity = (req, res) => {
	Entity.findOne({_id: req.params.id, isActive: true}, async (err, entity) => {
		if(err) {
			res.status(500).json({message: err.message});
		}
		
		if("body" in req){
			const {previousVersion, actionType, sections, assets, newSections} = req.body;
			const params = {
				application: res.locals.application,
				actionType: actionType,
				sections: sections,
				author: {
					id: res.locals.tokenData.user.id,
					name: res.locals.tokenData.user.name
				},
				status: "pending",
				isNew: false,
				entity: req.params.id,
				assets: assets,
				newSections: newSections
			}; 
			if(await saveEntity(params)){
				res.status(201).json({message: "Successful"});	
			} else {
				res.status(803).json({message: "Error while creating Version"});
			}
		} else {
			res.status(400).json({message: "Bad request. Post data not found"});	
		}
	});
};

exports.list_entities = (req, res) => {
	Entity.find({application: res.locals.application, isActive: true}).populate("approvedVersion").exec((err, versions) => {
		if(err){
			return res.status(803).json({message: err.message});
		}
		res.status(200).json(versions);
		return res;
	});
};
