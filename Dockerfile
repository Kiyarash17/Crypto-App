# syntax=docker/dockerfile:1
FROM node:16-alpine
# RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .

RUN npm install
# COPY package.json package.lock.json ./
# RUN yarn install 
# COPY next.config.js ./next.config.js

CMD ["node", "dev"]
# EXPOSE 3000