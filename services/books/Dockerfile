FROM node:11

WORKDIR /app

COPY ./services/books ./services/books

COPY ./services/common ./services/common

WORKDIR /app/services/common
RUN npm install

WORKDIR /app/services/books
RUN npm install

EXPOSE ${BOOKS_PORT}

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

CMD /wait && npm start



