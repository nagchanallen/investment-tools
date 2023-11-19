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
	go fmt ./...

.PHONY: lint
lint:
	golangci-lint run

.PHONY: dev
dev: vendor
	APP_CONFIG_PATH=${APP_CONFIG_PATH} GIN_MODE=${GIN_MODE} PORT=${PORT} go run main.go
