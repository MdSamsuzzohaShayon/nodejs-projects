FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

ENV PORT 3000
EXPOSE $PORT



# THIS IS FOR PRODUCTION 
# CMD ["node", "app.js"]

CMD ["npm", "start"]
