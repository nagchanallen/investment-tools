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

