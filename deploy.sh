cd /home/dmytro/express-microservices
sudo git pull
sudo systemctl start docker
sudo docker-compose -f ./docker-compose.prod.yml build --no-cache
sudo docker-compose -f ./docker-compose.prod.yml up -d --force-recreate