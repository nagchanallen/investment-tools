.PHONY: setup
setup:
	make -C web setup
	make -C backend setup

.PHONY: build-services
update-services:
	docker compose build

.PHONY: dev
dev:
	docker compose up

.PHONY: format
format:	
	make -C web format
	docker compose run --rm backend go fmt ./...

.PHONY: lint
lint:
	make -C web lint
	docker run -t --rm -v $(shell pwd)/backend:/app -w /app golangci/golangci-lint:v1.55.0 golangci-lint run 
