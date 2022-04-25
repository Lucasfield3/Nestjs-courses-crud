FROM node:lts-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

RUN npm install -g @nestjs/cli

RUN apk add --no-cache bash

COPY --chown=node:node . .

RUN ["chmod", "755", ".docker/entrypoint.sh"]
