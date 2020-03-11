FROM node:lts-alpine as build-stage

RUN npm install -g http-server
RUN npm install -g @vue/cli 

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]