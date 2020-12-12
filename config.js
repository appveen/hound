const os = require("os")
const mongodb = require("mongodb")

module.exports = {
	"hostname": os.hostname(),
	"server": {
		"port": process.env.PORT || 18080
	},
	"db": {
		"author": {
			"url": process.env.MONGO_AUTHOR_URL || 'mongodb://localhost:27017',
			"dbName": process.env.MONGO_AUTHOR_DBNAME || "odpConfig",
			"collection": process.env.MONGO_AUTHOR_COLLECTION || "counters"
		},
		"appcenter": {
			"url": process.env.MONGO_APPCENTER_URL || 'mongodb://localhost:27017',
			"dbName": process.env.MONGO_APPCENTER_DBNAME || "appveen-adam",
			"collection": process.env.MONGO_APPCENTER_COLLECTION || "counters"
		},
		"logs": {
			"url": process.env.MONGO_LOGS_URL || 'mongodb://localhost:27017',
			"dbName": process.env.MONGO_LOGS_DBNAME || "odpLogs",
			"collection": process.env.MONGO_LOGS_COLLECTION || "counters"
		},
		"mongoReconnectiontime": process.env.MONGO_RECONN_TIME || "1000",
		"mongoReconnectionRetries": process.env.MONGO_RECONN_TRIES || "1",
		"mongooseOptions": {
			"reconnectTries": process.env.MONGO_RECONN_TRIES || "1",
			"reconnectInterval": process.env.MONGO_RECONN_TIME || "500",
			"dbName": process.env.MONGO_AUTHOR_DBNAME || 'odpConfig',
			"useNewUrlParser": true
		},
		"mongoUtilsOptions": {
			"defaults": { "filter": { '_metadata.deleted': false } },
			"numberOfRetries": process.env.MONGO_RECONN_TRIES || "1",
			"retryMiliSeconds": process.env.MONGO_RECONN_TIME || "500",
			"useNewUrlParser": true
		},
		"mongoOptions": {
			"readPreference": mongodb.ReadPreference.SECONDARY_PREFERRED,
			"numberOfRetries": process.env.MONGO_RECONN_TRIES || "1",
			"useUnifiedTopology": true
		}
	},
	"logging": {
		"loglevel": process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info",
		"options": {
			"appenders": {
				"out": {
					"type": 'stdout'
				}
			},
			"categories": {
				"default": {
					"appenders": ['out'],
					"level": 'error'
				}
			}
		}
	},
}