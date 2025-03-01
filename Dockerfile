FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY .env .env

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app /app
COPY .env .env

EXPOSE 7000

CMD ["npm", "start"]
