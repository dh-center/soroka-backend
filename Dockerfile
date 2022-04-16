FROM node:16

WORKDIR /soroka-backend

COPY . .

RUN npm install
