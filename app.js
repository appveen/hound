"use strict"
const log4js = require("log4js")
const config = require("./config")
log4js.configure(config.logging.options);

let version = require("./package.json").version
let log = log4js.getLogger(`[${process.env.HOSTNAME || "hound"}] [${version}]`)
log.level = config.logging.loglevel
global.logger = log

let mongo = require("./lib/mongo.lib")
let mongoose = require("./lib/mongoose.lib")
let mongoUtil = require("./lib/mongoUtil.lib")
let mongoUtilNew = require("./lib/mongoUtilNew.lib")

async function start() {
	// check the default values in config.js also.
	log.info(`process.env.MONGO_AUTHOR_URL :: ${process.env.MONGO_AUTHOR_URL || 'mongodb://localhost:27017'}`)
	log.info(`process.env.MONGO_APPCENTER_URL :: ${process.env.MONGO_APPCENTER_URL || 'mongodb://localhost:27017'}`)
	log.info(`process.env.MONGO_LOGS_URL :: ${process.env.MONGO_LOGS_URL || 'mongodb://localhost:27017'}`)
	log.info(`process.env.MONGO_AUTHOR_DBNAME :: ${process.env.MONGO_AUTHOR_DBNAME || 'odpConfig'}`)
	log.info(`process.env.MONGO_LOGS_DBNAME :: ${process.env.MONGO_LOGS_DBNAME || "odpLogs"}`)
	log.info(`process.env.MONGO_RECONN_TIME :: ${process.env.MONGO_RECONN_TIME || "500"}`)
	log.info(`process.env.MONGO_RECONN_TRIES :: ${process.env.MONGO_RECONN_TRIES || "1"}`)

	await mongo.test()
	await mongoose.test()
	await mongoUtil.test()
	await mongoUtilNew.test()

	log.info("END OF MONGO TESTS")

}
start()
