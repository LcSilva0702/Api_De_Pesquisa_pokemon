FROM node:21-alpine3.17

WORKDIR /usr/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3 && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3

COPY . .

EXPOSE 3000

CMD ["npm","run", "dev"]