FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
	ca-certificates \
	&& npm install \
	&& apt-get clean && rm -rf /var/lib/apt/lists/*


COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
