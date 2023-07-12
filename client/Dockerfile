FROM node:18-alpine AS client_dev
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn
CMD ["yarn", "start"]

FROM node:18-alpine AS client_prod
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build

#  PREBUILD IT FIRST AND THEN LET IT COPY, HACKY BUT IT WORKS!