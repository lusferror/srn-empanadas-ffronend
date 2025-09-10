FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
	ca-certificates \
	&& npm install \
	&& apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3000

RUN [ -f ./.env ] || cp ./.env.example ./.env

CMD ["npm", "run", "start"]
