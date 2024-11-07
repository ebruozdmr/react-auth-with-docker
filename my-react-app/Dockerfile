FROM node:23-alpine3.19

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --include=dev

COPY . .

CMD [ "npm","run","start" ]