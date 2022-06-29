FROM node:lts-alpine AS builder

ENV NODE_ENV production

WORKDIR /opt/app
COPY . /opt/app/

RUN npm install --omit=dev --omit=optional

RUN npm run build

FROM node:lts-alpine AS prod

ENV NODE_ENV production

WORKDIR /opt/app
COPY --from=builder /opt/app/dist /opt/app/
COPY --from=builder /opt/app/node_modules /opt/app/node_modules

CMD node /opt/app/index.js


FROM node:16 as dev

ENV NODE_ENV development

WORKDIR /opt/app

COPY --from=builder /opt/app/ /opt/app

RUN npm install

CMD npm start
