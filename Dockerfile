FROM node:14.15.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN rm -rf /app/.env
RUN npm run build

EXPOSE 4002

CMD ["npm", "start"]