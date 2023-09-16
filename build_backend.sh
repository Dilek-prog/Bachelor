#!/bin/sh

docker run -it bachelor-backend:latest python3 /app/manage.py makemigrations
docker run -it bachelor-backend:latest python3 /app/manage.py migrate
docker run -it bachelor-backend:latest python3 /app/manage.py createsuperuser

