const mongoose = require('mongoose');
const config = require("../config")

let logger = global.logger

let e = {}

async function mongooseAuthorConnection() {
	logger.info("Author :: Mongoose connection tests")
	try {
		const client = new mongoose.connect(config.db.author.url, config.db.mongoOptions)
		await client.connect()
		logger.info("Connected to Author MongoDB")
		let db = client.db(config.db.author.dbName)
		logger.info(`Using DB :: ${config.db.author.dbName}`)
		let collections = await db.collections()
		logger.info(`Author collections :: ${JSON.stringify(collections)}`)
		let stats = await db.stats()
		logger.info(`Author stats :: ${JSON.stringify(stats)}`)
		logger.info("Author :: Mongoose client test :: PASS")
	} catch (e) {
		logger.error("Author :: Mongoose client error")
		logger.error(e)
		logger.error("Author :: Mongoose client test :: FAIL")
	}
}

async function mongoAppCenterConnection() {
	logger.info("AppCenter :: Mongoose connection tests")
	try {
		const client = new mongodb.MongoClient(config.db.appcenter.url, config.db.mongoOptions)
		await client.connect()
		logger.info("Connected to AppCenter MongoDB")
		let db = client.db(config.db.appcenter.dbName)
		logger.info(`Using DB :: ${config.db.appcenter.dbName}`)
		let collections = await db.collections()
		logger.info(`AppCenter collections :: ${JSON.stringify(collections)}`)
		let stats = await db.stats()
		logger.info(`AppCenter stats :: ${JSON.stringify(stats)}`)
		logger.info("AppCenter :: Mongoose client test :: PASS")
	} catch (e) {
		logger.error("AppCenter :: Mongoose client error")
		logger.error(e)
		logger.error("AppCenter :: Mongoose client test :: FAIL")
	}
}

async function mongoLogConnection() {
	logger.info("Log :: Mongoose connection tests")
	try {
		const client = new mongodb.MongoClient(config.db.logs.url, config.db.mongoOptions)
		await client.connect()
		logger.info("Connected to Logs MongoDB")
		let db = client.db(config.db.logs.dbName)
		logger.info(`Using DB :: ${config.db.logs.dbName}`)
		let collections = await db.collections()
		logger.info(`Logs collections :: ${JSON.stringify(collections)}`)
		let stats = await db.stats()
		logger.info(`Logs stats :: ${JSON.stringify(stats)}`)
		logger.info("Logs :: Mongoose client test :: PASS")
	} catch (e) {
		logger.error("Logs :: Mongoose client error")
		logger.error(e)
		logger.error("Logs :: Mongoose client test :: FAIL")
	}
}

e.test = async () => {
	logger.info("MONGOOSE CONNECTION TESTS")

	// start the tests
	await mongooseAuthorConnection()
	// await mongoAppCenterConnection()
	// await mongoLogConnection()
}

module.exports = e;