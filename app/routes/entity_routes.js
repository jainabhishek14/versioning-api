module.exports = function(app) {
	const entities 			= require("../controllers/entityController");

	app.route("/entity")
		.post(entities.create_entity)
		.get(entities.list_entities);

	app.route("/entity/:id")
		.get(entities.get_entity)
		.delete(entities.delete_entity)
		.put(entities.update_entity);

};