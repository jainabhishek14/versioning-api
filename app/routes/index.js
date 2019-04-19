const versionRoutes 	= require("./version_routes");
const entityRoutes 		= require("./entity_routes");
const isAuthenticated 	= require("../middlewares/authentication");
const isValidRequest 	= require("../middlewares/validRequest");
const handler 			= require("../middlewares/handler");
const hasAPIKey 		= require("../middlewares/apiKey");
const health 		 	= require("../controllers/healthCheckController");
const logs 			 	= require("../controllers/logsController");

module.exports = function(app, db) {

	app.use(handler.errorHandler);
	
	app.get("/get-logs", logs.retrieveLogs);
	
	//health check
	app.get("/health", health.check);

	app.all("*", isValidRequest, isAuthenticated, hasAPIKey);
	// app.all("*", isValidRequest, hasAPIKey);

	versionRoutes(app, db);
	entityRoutes(app, db);
	// Other route groups could go here, in the future
	

	app.all("*", handler.unknownMethodHandler);
};