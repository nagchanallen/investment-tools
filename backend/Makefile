DOCKER_SHELL_PREFIX ?= docker compose run --rm backend
APP_CONFIG_PATH ?= .env
GIN_MODE ?= debug
PORT ?= 8000

.PHONY: vendor
vendor:
	go install

.PHONY: setup
setup:
	cp .env.example .env

.PHONY: format
format:
	${DOCKER_SHELL_PREFIX} go fmt ./...

.PHONY: format-local
format-local:
	go fmt ./...

.PHONY: lint
lint:
	docker run -t --rm -v $(shell pwd):/app -w /app golangci/golangci-lint:v1.55.0 golangci-lint run 

.PHONY: lint-local
lint-local:
	golangci-lint run

.PHONY: dev
dev: vendor
	APP_CONFIG_PATH=${APP_CONFIG_PATH} GIN_MODE=${GIN_MODE} PORT=${PORT} go run main.go
