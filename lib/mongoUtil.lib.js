const mongo = require('mongodb').MongoClient;
const URL = require('url');
const config = require("../config")

let logger = global.logger

let e = {}

async function connect(url, options) {
	// url = URL.format(URL.parse(url));
	defaults = options && options.defaults ? options.defaults : {};
	delete options.defaults;
	return await mongo.connect(url, options)
}

async function mongoUtilAuthorConnection() {
	logger.info("Author :: MongoUtil Test")
	try {
		const client = await connect(config.db.author.url, config.db.mongoUtilsOptions)
		logger.info("Author :: Connected")
		let db = client.db(config.db.author.dbName)
		logger.info(`Author :: DB :: ${config.db.author.dbName}`)
		logger.info(`Author :: Collection :: ${config.db.author.collection}`)
		let data = await db.collection(config.db.author.collection).findOne()
		logger.info(`Author :: Data :: ${JSON.stringify(data)}`)
		await client.close()
		logger.info("Author :: Disconnected")
		logger.info("Author :: MongoUtil Test :: PASS")
	} catch (e) {
		logger.error("Author :: MongoUtil Test error")
		logger.error(e)
		logger.error("Author :: MongoUtil Test :: FAIL")
	}
}

async function mongoUtilAppCenterConnection() {
	logger.info("AppCenter :: MongoUtil Test")
	try {
		const client = await connect(config.db.appcenter.url, config.db.mongoUtilsOptions)
		logger.info("AppCenter :: Connected")
		let db = client.db(config.db.appcenter.dbName)
		logger.info(`AppCenter :: DB :: ${config.db.appcenter.dbName}`)
		logger.info(`AppCenter :: Collection :: ${config.db.appcenter.collection}`)
		let data = await db.collection(config.db.appcenter.collection).findOne()
		logger.info(`AppCenter :: Data :: ${JSON.stringify(data)}`)
		await client.close()
		logger.info("AppCenter :: Disconnected")
		logger.info("AppCenter :: MongoUtil Test :: PASS")
	} catch (e) {
		logger.error("AppCenter :: MongoUtil Test error")
		logger.error(e)
		logger.error("AppCenter :: MongoUtil Test :: FAIL")
	}
}

async function mongoUtilLogConnection() {
	logger.info("Logs :: MongoUtil Test")
	try {
		const client = await connect(config.db.logs.url, config.db.mongoUtilsOptions)
		logger.info("Logs :: Connected")
		let db = client.db(config.db.logs.dbName)
		logger.info(`Logs :: DB :: ${config.db.logs.dbName}`)
		logger.info(`Logs :: Collection :: ${config.db.logs.collection}`)
		let data = await db.collection(config.db.logs.collection).findOne()
		logger.info(`Logs :: Data :: ${JSON.stringify(data)}`)
		await client.close()
		logger.info("Logs :: Disconnected")
		logger.info("Logs :: MongoUtil Test :: PASS")
	} catch (e) {
		logger.error("Logs :: MongoUtil Test error")
		logger.error(e)
		logger.error("Logs :: MongoUtil Test :: FAIL")
	}
}

e.test = async () => {
	logger.info("MONGO UTIL CONNECTION TESTS")
	// start the tests
	await mongoUtilAuthorConnection()
	await mongoUtilAppCenterConnection()
	await mongoUtilLogConnection()
}

module.exports = e;