FROM node:18
LABEL authors="Fedi"

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend ./
RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview"]
