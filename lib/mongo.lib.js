const mongodb = require("mongodb")
const config = require("../config")

let logger = global.logger

let e = {}

async function mongoAuthorConnection() {
	logger.info("Author :: Raw mongo connection tests")
	try {
		const client = new mongodb.MongoClient(config.db.author.url, config.db.mongoOptions)
		await client.connect()
		logger.info("Connected to Author MongoDB")
		let db = client.db(config.db.author.dbName)
		logger.info(`Using DB :: ${config.db.author.dbName}`)
		let collections = await db.collections()
		logger.info(`Author collections :: ${JSON.stringify(collections)}`)
		let stats = await db.stats()
		logger.info(`Author stats :: ${JSON.stringify(stats)}`)
		logger.info("Author :: Raw mongo client test :: PASS")
	} catch (e) {
		logger.error("Author :: Raw mongo client error")
		logger.error(e)
		logger.error("Author :: Raw mongo client test :: FAIL")
	}
}

async function mongoAppCenterConnection() {
	logger.info("AppCenter :: Raw mongo connection tests")
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
		logger.info("AppCenter :: Raw mongo client test :: PASS")
	} catch (e) {
		logger.error("AppCenter :: Raw mongo client error")
		logger.error(e)
		logger.error("AppCenter :: Raw mongo client test :: FAIL")
	}
}

async function mongoLogConnection() {
	logger.info("Log :: Raw mongo connection tests")
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
		logger.info("Logs :: Raw mongo client test :: PASS")
	} catch (e) {
		logger.error("Logs :: Raw mongo client error")
		logger.error(e)
		logger.error("Logs :: Raw mongo client test :: FAIL")
	}
}

e.test = async () => {
	logger.info("RAW MONGODB CONNECTION TESTS")

	// check the default values in config.js also.
	logger.info(`process.env.MONGO_AUTHOR_URL :: ${process.env.MONGO_AUTHOR_URL || 'mongodb://localhost:27017'}`)
	logger.info(`process.env.MONGO_APPCENTER_URL :: ${process.env.MONGO_APPCENTER_URL || 'mongodb://localhost:27017'}`)
	logger.info(`process.env.MONGO_LOGS_URL :: ${process.env.MONGO_LOGS_URL || 'mongodb://localhost:27017'}`)
	logger.info(`process.env.MONGO_AUTHOR_DBNAME :: ${process.env.MONGO_AUTHOR_DBNAME || 'odpConfig'}`)
	logger.info(`process.env.MONGO_LOGS_DBNAME :: ${process.env.MONGO_LOGS_DBNAME || "odpLogs"}`)
	logger.info(`process.env.MONGO_RECONN_TIME :: ${process.env.MONGO_RECONN_TIME || "500"}`)
	logger.info(`process.env.MONGO_RECONN_TRIES :: ${process.env.MONGO_RECONN_TRIES || "1"}`)

	// start the tests
	await mongoAuthorConnection()
	await mongoAppCenterConnection()
	await mongoLogConnection()
}

module.exports = e;