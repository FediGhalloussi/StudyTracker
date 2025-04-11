FROM node:18
LABEL authors="Fedi"

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install

COPY ./backend ./
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
