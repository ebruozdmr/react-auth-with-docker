FROM node:23-alpine3.19 

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --include=dev

COPY . .

CMD ["npx", "nodemon", "--legacy-watch", "server.js"]


