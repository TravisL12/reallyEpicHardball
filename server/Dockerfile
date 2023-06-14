FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY . .
RUN yarn
RUN npx prisma generate
EXPOSE 8080
CMD ["yarn", "start"]