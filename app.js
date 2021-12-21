require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const io = require("@pm2/io");
const { name } = require("./package.json");
const currentReqs = io.counter({
	name: "Errors",
	id: "errorCounter1",
	unit: "error"
});

if (process.env.npm_lifecycle_script == "nodemon app.js") {
	process.env.NODE_ENV = "development";
} else if (process.env.npm_lifecycle_script == "node .") {
	process.env.NODE_ENV = "development";
} else {
	process.env.NODE_ENV = "production";
}

Sentry.init({
    dsn: process.env.SENTRY_ENDPOINT,
    environment: process.env.NODE_ENV,
    release: name + "@" + process.env.npm_package_version,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
    debug: process.env.NODE_ENV == "development" ? true : false,
});
  
app.use(Sentry.Handlers.requestHandler({ ip: true }));
app.use(Sentry.Handlers.tracingHandler());


const cors = require("cors");
app.use(cors());

app.get('/',function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

const v1Routes = require('./src/api/v1/Routes');
const v2Routes = require('./src/api/v2/Routes');
const { SentryError } = require("./SentryError");
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  res.status(500).end(`Error ID: ${res.sentry}` + "\n" + `Error Details: ${err}`);
});    

app.listen(PORT, () => console.log(`API Démarré sur le port: ${PORT}`));

process.on("unhandledRejection", (err) => {
    currentReqs.inc();
    throw new SentryError(err);
 });