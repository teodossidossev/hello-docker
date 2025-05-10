FROM node:18-alpine

WORKDIR /app

COPY ./public ./public
COPY ./index.js ./

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "public", "-p", "8080"]