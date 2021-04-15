FROM node:14-buster

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build && \
    npm prune --production


EXPOSE 3000

CMD [ "npm", "start" ]
