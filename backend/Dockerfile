FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update && apt-get install -y curl
RUN curl -sSLo /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it

EXPOSE 3000

CMD ["wait-for-it", "db:3306", "--timeout=60", "--strict", "--", "npm", "run", "start:dev"]
