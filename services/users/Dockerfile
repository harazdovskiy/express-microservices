FROM node:11

WORKDIR /app

COPY ./ /app

RUN npm install

EXPOSE ${USERS_PORT}

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start

