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

async function start() {
	await mongo.test()
	await mongoose.test()
}
start()
