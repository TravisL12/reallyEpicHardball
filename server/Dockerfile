FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
RUN yarn
RUN yarn prisma generate
EXPOSE 8080
CMD ["yarn", "start"]