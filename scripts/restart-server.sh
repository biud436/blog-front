#!/bin/sh
cd /home/ubuntu/devops
sudo docker-compose pull blog
sudo docker-compose up -d blog
sudo docker image prune -f