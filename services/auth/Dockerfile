FROM node:11

WORKDIR /app

ARG SSH_PRIVATE_KEY

COPY ./services/auth /app

RUN mkdir /root/.ssh/
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa

RUN cat ${SSH_PRIVATE_KEY}

#Github requires a private key with strict permission settings
RUN chmod 600 /root/.ssh/id_rsa

#Add Github to known hosts
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts



# COPY ./ssh /root/.ssh

# RUN eval `ssh-agent -s`

# RUN chmod 400 /root/.ssh/id_rsa

# RUN ssh-add root/.ssh/id_rsa

RUN npm install

# RUN rm -rf /root/.ssh

EXPOSE ${AUTH_PORT}

CMD npm start


