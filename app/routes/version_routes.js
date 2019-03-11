module.exports = function(app) {

	const versions 		= require("../controllers/versionListController");
	const isAuthenticated 	= require("../middlewares/authentication");
	const isValidRequest 	= require("../middlewares/validRequest");
	const handler 			= require("../middlewares/handler");
	const health 		 	= require("../controllers/healthCheckController");
	const logs 			 	= require("../controllers/logsController");
	
	app.use(handler.errorHandler);
	
	app.all("*", isValidRequest, isAuthenticated);
	
	app.get("/get-logs", logs.retrieveLogs);
	
	//health check
	app.get("/health", health.check);

	app.route("/application/:applicationID/entity/:entityID")
		.get(versions.list_versions)
		.post(versions.create_version);

	app.route("/asset/:id")
		.get(versions.get_asset_details);

	app.all("*", handler.unknownMethodHandler);

};