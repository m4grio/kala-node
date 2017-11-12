SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

up:
	docker-compose up -d

check:
	standard

test: install check up
	mocha

install:
	npm install
	npm install --only=dev
	docker-compose build

clean:
	rm -rf node_modules
	docker-compose rm -sf
