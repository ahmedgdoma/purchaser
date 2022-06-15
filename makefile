composerFile := -f docker/docker-compose.yml
php_image := purchaser_php
frontend_image := purchaser_frontend


build:
	docker-compose $(composerFile) build

up:
	docker-compose $(composerFile) up -d

down:
	docker-compose $(composerFile) down

install:
	docker-compose $(composerFile) exec -u 1000 $(php_image) bash -c "composer install"
	docker-compose $(composerFile) exec $(frontend_image) sh -c "npm install"
	make migrate
	make seed

php_bash:
	docker-compose $(composerFile) exec -u 1000 $(php_image) bash

frontend_bash:
	docker-compose $(composerFile) exec $(frontend_image) sh

migrate:
	docker-compose $(composerFile) exec -u 1000 $(php_image) bash -c "php artisan migrate"

seed:
	docker-compose $(composerFile) exec -u 1000 $(php_image) bash -c "php artisan db:seed"

network:
	docker network inspect purchaser_network >/dev/null 2>&1 || \
        docker network create --driver bridge purchaser_network

env:
	cp backend/.env.example  backend/.env

init:
	make network
	make env
	make build
	make up
	make install
	make up

