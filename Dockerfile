FROM node:alpine

RUN set -ex; apk add --no-cache --virtual .fetch-deps curl tar git ;

WORKDIR /app

COPY package.json /app

RUN npm install --production

COPY app.js /app
COPY config.js /app
COPY lib /app/lib
COPY hound /app
COPY run.sh /app

ENTRYPOINT ["/app/run.sh"]

CMD [ "node" ]