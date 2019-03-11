const express        = require("express");
const bodyParser     = require("body-parser");
const mongoose 		 = require("mongoose");
const winston		 = require("winston");
const compression	 = require("compression");
const helmet	 	 = require("helmet");
const moment	 	 = require("moment");
const dotenv		 = require("dotenv").config();
const app            = express();

const version 		 = require("./app/models/versionModel");
const HealthCheck 	 = require("./app/models/healthCheckModel");
const logs		 	 = require("./app/controllers/logsController");

app.use(compression());
app.use(helmet());

const port = process.env.PORT || 6666;

app.use(logs.logRequests("info"));

// mongoose instance connection url connections
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }).then( err => console.error.bind(console, "MongoDB connection error:"));	

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes")(app);

app.listen(port, () => {
	console.log("We are live on " + port);
});