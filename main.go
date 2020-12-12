package main

import (
	"log"
	"os"
)

func dbUtil(url, db, collection string) {

}

func main() {
	log.Println("Go Mongo tests")

	MONGO_AUTHOR_URL := "mongodb://localhost:27017"
	MONGO_APPCENTER_URL := "mongodb://localhost:27017"
	MONGO_LOGS_URL := "mongodb://localhost:27017"
	MONGO_AUTHOR_DBNAME := "odpConfig"
	MONGO_LOGS_DBNAME := "odpLogs"
	MONGO_RECONN_TIME := "500"
	MONGO_RECONN_TRIES := "1"

	if os.Getenv("MONGO_AUTHOR_URL") != "" {
		MONGO_AUTHOR_URL = os.Getenv("MONGO_AUTHOR_URL")
	}
	if os.Getenv("MONGO_APPCENTER_URL") != "" {
		MONGO_APPCENTER_URL = os.Getenv("MONGO_APPCENTER_URL")
	}
	if os.Getenv("MONGO_LOGS_URL") != "" {
		MONGO_LOGS_URL = os.Getenv("MONGO_LOGS_URL")
	}
	if os.Getenv("MONGO_AUTHOR_DBNAME") != "" {
		MONGO_AUTHOR_DBNAME = os.Getenv("MONGO_AUTHOR_DBNAME")
	}
	if os.Getenv("MONGO_LOGS_DBNAME") != "" {
		MONGO_LOGS_DBNAME = os.Getenv("MONGO_LOGS_DBNAME")
	}
	if os.Getenv("MONGO_RECONN_TIME") != "" {
		MONGO_RECONN_TIME = os.Getenv("MONGO_RECONN_TIME")
	}
	if os.Getenv("MONGO_RECONN_TRIES") != "" {
		MONGO_RECONN_TRIES = os.Getenv("MONGO_RECONN_TRIES")
	}

	log.Printf("MONGO_AUTHOR_URL :: %s", MONGO_AUTHOR_URL)
	log.Printf("MONGO_APPCENTER_URL :: %s", MONGO_APPCENTER_URL)
	log.Printf("MONGO_LOGS_URL :: %s", MONGO_LOGS_URL)
	log.Printf("MONGO_AUTHOR_DBNAME :: %s", MONGO_AUTHOR_DBNAME)
	log.Printf("MONGO_LOGS_DBNAME :: %s", MONGO_LOGS_DBNAME)
	log.Printf("MONGO_RECONN_TIME :: %s", MONGO_RECONN_TIME)
	log.Printf("MONGO_RECONN_TRIES :: %s", MONGO_RECONN_TRIES)
}
