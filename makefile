composerFile := -f docker/docker-compose.yml
image := purchaser_php


build:
	docker-compose $(composerFile) build

up:
	docker-compose $(composerFile) up -d

down:
	docker-compose $(composerFile) down

install:
	docker-compose $(composerFile) exec $(image) bash -c "composer install"
	make migrate
	make seed

php_bash:
	docker-compose $(composerFile) exec -u 1000 $(image) bash

migrate:
	docker-compose $(composerFile) exec -u 1000 $(image) bash -c "php artisan migrate"

seed:
	docker-compose $(composerFile) exec -u 1000 $(image) bash -c "php artisan db:seed"

network:
	docker network create purchaser_network

init:
	make network
	make build
	make up
	make install

