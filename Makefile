SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

.PHONY: up
up:
	docker-compose up -d

.PHONY: check
check:
	standard

.PHONY: test
test: install check up
	mocha
	$(MAKE) clean-docker

.PHONY: install
install: node_modules
	docker-compose build

node_modules:
	npm install

.PHONY: clean
clean:
	rm -rf node_modules

clean-docker:
	docker-compose rm -sf
