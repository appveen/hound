package main

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readconcern"
	"go.mongodb.org/mongo-driver/mongo/writeconcern"
)

// Author :: Connected
// Author :: DB :: odpConfig
// Author :: Collection :: counters
// Author :: Data :: null
// Author :: Disconnected
// Author :: Test :: PASS

type Result struct {
	ID string `json:"_id"`
}

func dbUtil(mongoType, url, dbName, collectionName string) {
	log.Printf("%s :: Tests", mongoType)

	connectionOptions := options.Client().ApplyURI(url)
	connectionOptions.SetWriteConcern(writeconcern.New(writeconcern.WMajority()))
	connectionOptions.SetReadConcern(readconcern.New(readconcern.Level("majority")))

	client, err := mongo.Connect(context.Background(), connectionOptions)
	if err != nil {
		log.Printf("%s :: Mongo connection error", mongoType)
		log.Printf("%s", err)
		log.Printf("%s :: Test :: FAIL", mongoType)
		return
	}
	log.Printf("%s :: Connected", mongoType)

	database := client.Database(dbName)
	log.Printf("%s :: DB :: %s", mongoType, dbName)

	collection := database.Collection(collectionName)
	log.Printf("%s :: Collection :: %s", mongoType, collectionName)

	result := Result{}
	err = collection.FindOne(context.TODO(), bson.M{}, options.FindOne()).Decode(&result)
	if err.Error() != "mongo: no documents in result" {
		log.Printf("%s :: Mongo find error", mongoType)
		log.Printf("%s", err)
		log.Printf("%s :: Test :: FAIL", mongoType)
		return
	}
	log.Printf("%s :: Data :: %s", mongoType, result)

	defer log.Printf("%s :: Test :: PASS", mongoType)
	defer log.Printf("%s :: Disconnected", mongoType)
	defer client.Disconnect(context.Background())
}

func main() {
	log.Println("Go Mongo tests")

	MONGO_AUTHOR_URL := "mongodb://localhost:27017"
	MONGO_APPCENTER_URL := "mongodb://localhost:27017"
	MONGO_LOGS_URL := "mongodb://localhost:27017"

	MONGO_AUTHOR_DBNAME := "odpConfig"
	MONGO_APPCENTER_DBNAME := "appveen-adam"
	MONGO_LOGS_DBNAME := "odpLogs"

	MONGO_AUTHOR_COLLECTION := "counters"
	MONGO_APPCENTER_COLLECTION := "counters"
	MONGO_LOGS_COLLECTION := "counters"

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
	if os.Getenv("MONGO_APPCENTER_DBNAME") != "" {
		MONGO_APPCENTER_DBNAME = os.Getenv("MONGO_APPCENTER_DBNAME")
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
	if os.Getenv("MONGO_AUTHOR_COLLECTION") != "" {
		MONGO_AUTHOR_COLLECTION = os.Getenv("MONGO_AUTHOR_COLLECTION")
	}
	if os.Getenv("MONGO_APPCENTER_COLLECTION") != "" {
		MONGO_APPCENTER_COLLECTION = os.Getenv("MONGO_APPCENTER_COLLECTION")
	}
	if os.Getenv("MONGO_LOGS_COLLECTION") != "" {
		MONGO_LOGS_COLLECTION = os.Getenv("MONGO_LOGS_COLLECTION")
	}

	log.Printf("MONGO_AUTHOR_URL :: %s", MONGO_AUTHOR_URL)
	log.Printf("MONGO_APPCENTER_URL :: %s", MONGO_APPCENTER_URL)
	log.Printf("MONGO_LOGS_URL :: %s", MONGO_LOGS_URL)

	log.Printf("MONGO_AUTHOR_DBNAME :: %s", MONGO_AUTHOR_DBNAME)
	log.Printf("MONGO_APPCENTER_DBNAME :: %s", MONGO_APPCENTER_DBNAME)
	log.Printf("MONGO_LOGS_DBNAME :: %s", MONGO_LOGS_DBNAME)

	log.Printf("MONGO_AUTHOR_COLLECTION  :: %s", MONGO_AUTHOR_COLLECTION)
	log.Printf("MONGO_APPCENTER_COLLECTION  :: %s", MONGO_APPCENTER_COLLECTION)
	log.Printf("MONGO_LOGS_COLLECTION  :: %s", MONGO_LOGS_COLLECTION)

	log.Printf("MONGO_RECONN_TIME :: %s", MONGO_RECONN_TIME)
	log.Printf("MONGO_RECONN_TRIES :: %s", MONGO_RECONN_TRIES)

	dbUtil("Author", MONGO_AUTHOR_URL, MONGO_AUTHOR_DBNAME, MONGO_AUTHOR_COLLECTION)
	dbUtil("AppCenter", MONGO_APPCENTER_URL, MONGO_APPCENTER_DBNAME, MONGO_APPCENTER_COLLECTION)
	dbUtil("Log", MONGO_LOGS_URL, MONGO_LOGS_DBNAME, MONGO_LOGS_COLLECTION)

	log.Println("END OF MONGO TESTS")

}
