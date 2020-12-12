#!/bin/bash
TAG=$(date +%Y.%m.%d.%H.%M)

env GOOS=linux GOARCH=386 go build -ldflags="-s -w" -o hound .

docker build -t appveen:hound."$TAG" --file ./Dockerfile .

docker tag appveen:hound."$TAG" 172.31.25.79:5000/appveen:hound."$TAG"

docker push 172.31.25.79:5000/appveen:hound."$TAG"

kubectl set image -n appveen --record=true deployment/hound hound=172.31.25.79:5000/appveen:hound."$TAG"