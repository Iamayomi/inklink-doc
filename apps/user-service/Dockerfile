FROM node As development

WORKDIR /usr/scr/app

COPY package*.json ./

RUN yarn add

COPY . .

RUN yarn build