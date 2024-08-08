FROM node:20.16.0-bookworm-slim

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "python3", "./app.py" ]
