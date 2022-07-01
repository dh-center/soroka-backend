.PHONY: run
run:
	docker-compose up

.PHONY: rund
rund:
	docker-compose up -d

.PHONY: lint
lint:
	docker exec -it soroka-backend npm run lint

.PHONY: seed
seed:
	docker exec -it soroka-backend npx sequelize-cli db:seed --seed 001-data-types.js
	docker exec -it soroka-backend npx sequelize-cli db:seed --seed 002-properties.js
	docker exec -it soroka-backend npx sequelize-cli db:seed --seed 003-user-roles.js


.PHONY: build
build:
	docker-compose build

.PHONY: migrate
migrate:
	docker exec -it soroka-backend npm run migrate

.DEFAULT_GOAL := build
