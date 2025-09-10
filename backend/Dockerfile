FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN [ -f ./.env ] || cp ./.env.example ./.env

CMD ["npm", "run", "dev"]
