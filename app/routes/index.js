const versionRoutes = require("./version_routes");

module.exports = function(app, db) {
	versionRoutes(app, db);
	// Other route groups could go here, in the future
};