FROM node:alpine

WORKDIR /usr/src/app

RUN npm update -g

COPY package*.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]