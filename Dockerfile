FROM node:lts-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

RUN npm install -g @nestjs/cli

RUN apk add --no-cache bash

USER node

