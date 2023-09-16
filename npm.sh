#!/bin/sh

docker run -it --rm -v ${PWD}/frontend/primeinsights:/app:z -w /app --user 1000:1000 --net=host node:latest npm $@