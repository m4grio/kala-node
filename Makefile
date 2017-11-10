SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

up:
	docker-compose up -d

test: install up
	npm run test

install:
	npm install --dev
	docker-compose build

clean:
	rm -rf node_modules
	docker-compose rm -sf
