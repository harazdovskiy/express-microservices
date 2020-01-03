ssh -i ./deploy_key TravisCIDeployKey@35.184.79.30 <<-"ENDSSH"
    cd /home/dmytro/express-microservices
    sudo git pull
    sudo systemctl start docker
    sudo docker-compose -f ./docker-compose.prod.yml up -d --build
ENDSSH