FROM node:11

WORKDIR /app

COPY ./services/auth ./services/auth

COPY ./services/common ./services/common

WORKDIR /app/services/common
RUN npm install

WORKDIR /app/services/auth
RUN npm install

EXPOSE ${AUTH_PORT}

CMD npm start


