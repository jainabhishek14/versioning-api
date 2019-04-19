module.exports = function(app) {

	const versions 		= require("../controllers/versionListController");

	app.route("/version/:id/action/:action")
		.get(versions.reviewVersion);

};