FROM node

WORKDIR /app

COPY package.json /app

COPY tsconfig.json /app

RUN npm install

RUN npm run build

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "run", "start:dev"]
