DOCKER_SHELL_PREFIX ?= docker compose run --rm web

.PHONY: vendor
vendor:
	yarn

.PHONY: setup
setup:
	cp .env.example .env

.PHONY: dev
dev: vendor
	yarn dev

.PHONY: lint
lint:
	${DOCKER_SHELL_PREFIX} yarn lint

.PHONY: lint-local
lint-local:
	yarn lint

.PHONY: format
format:
	${DOCKER_SHELL_PREFIX} yarn format

.PHONY: format-local
format-local:
	yarn format
