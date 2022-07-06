#!/usr/bin/env sh

mkdir -p "config"
echo { \"production\": { \"username\": \""${POSTGRES_USER}"\", \"password\": \"${POSTGRES_PASSWORD}\", \"database\": \"${POSTGRES_DB}\", \"database\": \"${POSTGRES_DB}\", \"host\": \"${DB_HOST}\", \"port\": \"${DB_PORT}\", \"dialect\": \"${DB_DIALECT}\" } } > config/config.json
