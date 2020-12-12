const mongoose = require('mongoose');
const config = require("../config")

let logger = global.logger

let e = {}

const definition = { '_id': "String" }

async function mongooseAuthorConnection() {
	logger.info("Author :: Mongoose test")
	try {
		await mongoose.connect(config.db.author.url, config.db.mongooseOptions)
		logger.info("Author :: Connected")
		logger.info(`Author :: DB :: ${config.db.author.dbName}`)
		logger.info(`Author :: Collection :: ${config.db.author.collection}`)
		let counter = mongoose.model("AuthorCounter", definition, config.db.author.collection)
		let data = await counter.findOne()
		logger.info(`Author :: Data :: ${JSON.stringify(data)}`)
		await mongoose.disconnect()
		logger.info("Author :: Disconnected")
		logger.info("Author :: Mongoose test :: PASS")
	} catch (e) {
		logger.error("Author :: Mongoose error")
		logger.error(e)
		logger.error("Author :: Mongoose test :: FAIL")
	}
}

async function mongooseAppCenterConnection() {
	logger.info("AppCenter :: Mongoose test")
	try {
		await mongoose.connect(config.db.appcenter.url, config.db.mongooseOptions)
		logger.info("AppCenter :: Connected")
		logger.info(`AppCenter :: DB :: ${config.db.appcenter.dbName}`)
		logger.info(`AppCenter :: Collection :: ${config.db.appcenter.collection}`)
		let counter = mongoose.model("AppCenterCounter", definition, config.db.appcenter.collection)
		let data = await counter.findOne()
		logger.info(`AppCenter :: Data :: ${JSON.stringify(data)}`)
		await mongoose.disconnect()
		logger.info("AppCenter :: Disconnected")
		logger.info("AppCenter :: Mongoose test :: PASS")
	} catch (e) {
		logger.error("AppCenter :: Mongoose error")
		logger.error(e)
		logger.error("AppCenter :: Mongoose test :: FAIL")
	}
}

async function mongooseLogConnection() {
	logger.info("Logs :: Mongoose test")
	try {
		await mongoose.connect(config.db.logs.url, config.db.mongooseOptions)
		logger.info("Logs :: Connected")
		logger.info(`Logs :: DB :: ${config.db.logs.dbName}`)
		logger.info(`Logs :: Collection :: ${config.db.logs.collection}`)
		let counter = mongoose.model("LogsCounter", definition, config.db.logs.collection)
		let data = await counter.findOne()
		logger.info(`Logs :: Data :: ${JSON.stringify(data)}`)
		await mongoose.disconnect()
		logger.info("Logs :: Disconnected")
		logger.info("Logs :: Mongoose test :: PASS")
	} catch (e) {
		logger.error("Logs :: Mongoose error")
		logger.error(e)
		logger.error("Logs :: Mongoose test :: FAIL")
	}
}

e.test = async () => {
	logger.info("MONGOOSE CONNECTION TESTS")

	// start the tests
	await mongooseAuthorConnection()
	await mongooseAppCenterConnection()
	await mongooseLogConnection()
}

module.exports = e;