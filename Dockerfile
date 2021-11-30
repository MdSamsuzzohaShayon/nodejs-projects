FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV

# RUN npm install 
# ONLY PRODUCTION FLAG WILL PREVENT TO INSTALL ANY DEV DEPENDENCIES 
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./

ENV PORT 3000
EXPOSE $PORT



# THIS IS FOR PRODUCTION 
# CMD ["node", "app.js"]

CMD ["node", "app.js"]
