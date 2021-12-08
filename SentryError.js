require("dotenv").config();
const Sentry = require("@sentry/node");
const { version } = require("./package.json");
// eslint-disable-next-line no-unused-vars
const Tracing = require("@sentry/tracing");

// initialises Sentry
Sentry.init({
	dsn: process.env.SENTRY_ENDPOINT,
	release: process.env.npm_package_name + "@" + version,
	environment: process.env.NODE_ENV,
});

class SentryError extends Error {
	constructor(errMessage, data, type = "error") {
		// Passes errMessage to the Error super class,
		// similar to call new Error(errMessage).
		super(errMessage);

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, SentryError);
		}

		this.name = "SentryError";

		Sentry.addBreadcrumb({
			category: "data",
			message: errMessage,
			data: data,
			type: type,
			level: Sentry.Severity.Debug,
		});

		Sentry.captureException(errMessage);
	}
}

module.exports = { SentryError };