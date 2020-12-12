const mongodb = require("mongodb")
const config = require("../config")

let logger = global.logger

let e = {}

async function mongoAuthorConnection() {
	logger.info("Author :: Test")
	try {
		const client = new mongodb.MongoClient(config.db.author.url, config.db.mongoOptions)
		await client.connect()
		logger.info("Author :: Connected")
		let db = client.db(config.db.author.dbName)
		logger.info(`Author :: DB :: ${config.db.author.dbName}`)
		logger.info(`Author :: Collection :: ${config.db.author.collection}`)
		let data = await db.collection(config.db.author.collection).findOne()
		logger.info(`Author :: Data :: ${JSON.stringify(data)}`)
		await client.close()
		logger.info("Author :: Disconnected")
		logger.info("Author :: Test :: PASS")
	} catch (e) {
		logger.error("Author :: Test error")
		logger.error(e)
		logger.error("Author :: Test :: FAIL")
	}
}

async function mongoAppCenterConnection() {
	logger.info("AppCenter :: Test")
	try {
		const client = new mongodb.MongoClient(config.db.appcenter.url, config.db.mongoOptions)
		await client.connect()
		logger.info("AppCenter :: Connected")
		let db = client.db(config.db.appcenter.dbName)
		logger.info(`AppCenter :: DB :: ${config.db.appcenter.dbName}`)
		logger.info(`AppCenter :: Collection :: ${config.db.appcenter.collection}`)
		let data = await db.collection(config.db.appcenter.collection).findOne()
		logger.info(`AppCenter :: Data :: ${JSON.stringify(data)}`)
		await client.close()
		logger.info("AppCenter :: Disconnected")
		logger.info("AppCenter :: Test :: PASS")
	} catch (e) {
		logger.error("AppCenter :: Test error")
		logger.error(e)
		logger.error("AppCenter :: Test :: FAIL")
	}
}

async function mongoLogConnection() {
	logger.info("Logs :: Test")
	try {
		const client = new mongodb.MongoClient(config.db.logs.url, config.db.mongoOptions)
		await client.connect()
		logger.info("Logs :: Connected")
		let db = client.db(config.db.logs.dbName)
		logger.info(`Logs :: DB :: ${config.db.logs.dbName}`)
		logger.info(`Logs :: Collection :: ${config.db.logs.collection}`)
		let data = await db.collection(config.db.logs.collection).findOne()
		logger.info(`Logs :: Data :: ${JSON.stringify(data)}`)
		await client.close()
		logger.info("Logs :: Disconnected")
		logger.info("Logs :: Test :: PASS")
	} catch (e) {
		logger.error("Logs :: Test error")
		logger.error(e)
		logger.error("Logs :: Test :: FAIL")
	}
}

e.test = async () => {
	logger.info("RAW MONGO CONNECTION TESTS")
	// start the tests
	await mongoAuthorConnection()
	await mongoAppCenterConnection()
	await mongoLogConnection()
}

module.exports = e;