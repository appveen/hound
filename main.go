package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readconcern"
	"go.mongodb.org/mongo-driver/mongo/writeconcern"
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
	ODP_NAMESPACE := "appveen"

	if os.Getenv("ODP_NAMESPACE") != "" {
		ODP_NAMESPACE = os.Getenv("ODP_NAMESPACE")
	}
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

	log.Printf("ODP_NAMESPACE :: %s", ODP_NAMESPACE)
	log.Printf("MONGO_AUTHOR_URL :: %s", MONGO_AUTHOR_URL)
	log.Printf("MONGO_APPCENTER_URL :: %s", MONGO_APPCENTER_URL)
	log.Printf("MONGO_LOGS_URL :: %s", MONGO_LOGS_URL)
	log.Printf("MONGO_AUTHOR_DBNAME :: %s", MONGO_AUTHOR_DBNAME)
	log.Printf("MONGO_LOGS_DBNAME :: %s", MONGO_LOGS_DBNAME)
	log.Printf("MONGO_RECONN_TIME :: %s", MONGO_RECONN_TIME)
	log.Printf("MONGO_RECONN_TRIES :: %s", MONGO_RECONN_TRIES)

	mongoURL := MONGO_APPCENTER_URL
	if mongoURL == "" {
		mongoURL = "mongodb://localhost:27017"
	}
	log.Printf("Connecting to mongoDB ...")

	connectionOptions := options.Client().ApplyURI(mongoURL)
	connectionOptions.SetWriteConcern(writeconcern.New(writeconcern.WMajority()))
	connectionOptions.SetReadConcern(readconcern.New(readconcern.Level("majority")))

	client, err := mongo.Connect(context.Background(), connectionOptions)
	if err != nil {
		log.Printf("ERROR While Connecting to MongoDB")
		log.Printf(fmt.Sprintf("%s", err))
		os.Exit(0)
		return
	}
	log.Printf("Connected to mongoDB")
	database := client.Database(ODP_NAMESPACE + "-Adam")
	collection := database.Collection("counters")
	options := options.Find()
	options.SetLimit(1)
	curr, err := collection.Find(context.TODO(), bson.M{}, options)
	if err != nil {
		log.Printf("ERROR While Trying to run Find Query")
		log.Printf(fmt.Sprintf("%s", err))
		os.Exit(0)
		return
	}
	if curr.Err() != nil {
		log.Printf("ERROR While Trying to run Find Query")
		log.Printf(fmt.Sprintf("%s", curr.Err().Error()))
		os.Exit(0)
		return
	}
	log.Printf("Go Mongo tests Success")

	defer client.Disconnect(context.Background())
}
