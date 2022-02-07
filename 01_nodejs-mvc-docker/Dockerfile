# specify base image
FROM node:14

# working directory of our container to be /app directory withen our container
WORKDIR /app

# copy our package.json file to current directory of container which is /app. inster of dot we also can use /app
COPY package.json .

# install all express dependencies 
# RUN npm install

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi


# copy rest of our files - all of our source code and all file we need to copy - dot and dot slash are same
# here we coping two times - indeed, we change our source code frequeently for development so whenever code change we will run this copy only and npm install won't run that will get cache from previously built container. Once we install any new dependecies package dot json will change and in that circumastances it will copy package.json and run npm install - purpose of this is optamization
COPY . ./

# creating environment variable 
ENV PORT 3000

# our app is running on port 3000 so we are exposing that port 
EXPOSE $PORT

# run nodejs app in container 
CMD ["npm", "run", "dev"]
