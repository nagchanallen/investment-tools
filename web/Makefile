.PHONY: vendor
vendor:
	yarn

.PHONY: setup
setup: vendor
	cp .env.example .env

.PHONY: dev
dev: vendor
	yarn dev

.PHONY: lint
lint:
	yarn lint

.PHONY: format
format:
	yarn format
