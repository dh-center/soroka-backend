.PHONY: init
init:
	npm i

.PHONY: run
run:
	docker-compose up -d
	npm start

.PHONY: lint
lint:
	npm run lint

.PHONY: build
build:
	npm run build

.DEFAULT_GOAL: init
