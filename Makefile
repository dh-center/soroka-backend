.PHONY: run
run:
	docker-compose up

.PHONY: rund
rund:
	docker-compose up -d

.PHONY: lint
lint:
	docker exec -it soroka-backend npm run lint

.PHONY: build
build:
	docker-compose build

.DEFAULT_GOAL := build
