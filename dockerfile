FROM node:16.15.1

RUN apt-get update

WORKDIR /app

COPY ["package.json", "yarn.lock"] .

RUN yarn

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["yarn", "run", "dev"]







