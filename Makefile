.PHONY: install dev build lint test clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

test:
	npm test

clean:
	rm -rf node_modules .next dist
