#!/bin/sh
cd /home/ubuntu/devops
sudo docker-compose pull blog
sleep 10
sudo docker-compose up -d blog
sleep 10
echo 'y' | sudo docker image prune -a