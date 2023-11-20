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
	make -C backend format

.PHONY: lint
lint:
	make -C web lint
	make -C backend lint
