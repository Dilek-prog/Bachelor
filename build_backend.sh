#!/bin/sh

docker run -it -v ${PWD}/backend/slackbridge/db.sqlite3:/app/db.sqlite3:z bachelor-backend:latest python3 /app/manage.py makemigrations
docker run -it -v ${PWD}/backend/slackbridge/db.sqlite3:/app/db.sqlite3:z bachelor-backend:latest python3 /app/manage.py migrate
docker run -it -v ${PWD}/backend/slackbridge/db.sqlite3:/app/db.sqlite3:z bachelor-backend:latest python3 /app/manage.py createsuperuser

