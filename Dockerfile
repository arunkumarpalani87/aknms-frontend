FROM node:10.15.0-alpine

WORKDIR /opt/

COPY . .

RUN npm install

CMD HTTPS=true npm start
