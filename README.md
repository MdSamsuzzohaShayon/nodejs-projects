# Download and run the project
download the file

```
cd shopping-cart
npm install
npm start
```



express-handlebars HAS MORE FUNCTIONLITY THAN BUILT IN HANDLEBARS
SO WE NEED TO INSTALL IT


Seeder is for just test 
adding data to data ase letter on I will use cms

for adding data with seeder we need to go seed directory in terminal
and 
# Add data to database 
```
node product-seeder.js
```

# CSRF Protection
Scrf protection take care of our session security. that can't stolen. 

For csrf protection we will use csurf
Node.js CSRF protection middleware.
Requires either a session middleware or cookie-parser to be initialized first.

```npm install csurf```

Any state changing operation requires a secure random token (e.g., CSRF token) to prevent CSRF attacks.

## Express Session
This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.

```npm install express-session```

## Passport js
Simple, unobtrusive authentication for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.

##### passport.js inside config file

- serializeUser
- deserializeUser
- create new strategy
    - check alreary registed or not
    - save user to the database
- authenticate

```npm install passport```


## Setup local strategy
Like facebook, twitter we can build our own strategy to login in our website. Passport strategy for authenticating with a username and password.

```npm install passport-local```

## Encrypt data with bcrypt
encrypting data with bcrypt-nodejs (hashSync, genSaltSync)
and saving encrypted data to the database after checking the email is already there or not

```npm install bcrypt-nodejs```

## express validation
```npm install express-validator```


## connect mongo
MongoDB session store for Connect and Express. 

```npm install connect-mongo```



# *problem*
https://www.youtube.com/watch?v=_pVKGCzbMwg&index=13&list=PL55RiY5tL51rajp7Xr_zk-fCFtzdlGKUp




### Docker commands

```
 node app.js 
 sudo docker rm node-ecom -f
 sudo docker images
 sudo docker image rm node-ecom-image -f
 sudo docker image prune
 sudo docker ps
 sudo docker images
 sudo docker build -t node-ecom-image .
 sudo docker rm node-ecom -f
 sudo docker run -d --name node-ecom -p 4000:3000 node-ecom-image
 sudo docker exec -it node-ecom sh
 sudo docker logs node-ecom

```
 - Final run for docker container
 ```
 sudo docker run --env-file ./config/.env -v $(pwd):/app -v /app/node_modules -v /config/.env -p 4000:3000 -d --name node-ecom node-ecom-image
 ```
 - `--env-file ./config/.env` SETTING ENVIRONMENT VARIABLE FROM FILE
 - `-v $(pwd):/app` BIND MOUNT VOLUMES (THIS IS FOR DEVELOPMENT VERSION ONLY BECAUSE IT'S NOW SYNCING ALL FILES INCLUDING FILES FROM .GITIGNORE WHICH WE DON'T WANT FOR DEVELOPMENT PURPOSE)
 - `-v /app/node_modules` THIS VOLUMENT IS FOR IGNORE SYNCING - THAT MEANS SYNC ALL FILES EXCLUDING NODE_MODULES
 - `-p 4000:3000` SETTING PORT NUMBER FOR OUR CONTAINER - WE WILL SEND REQUEST FROM LOCALHOST TO 4000 PORT NUMBER BUT THIS WILL FORWARD THAT PORT WITH 3000 PORT IN CONTAINER - THAT MEANS WE HAVE TO WORK WITH 3000 INSIDE CONTAINER AND 4000 ON LOCAL MACHINE
 - `-d` DETACH MODE WILL RUN OUR CONTAINER IN BACKGROUND SO WE CAN PLAY WITH TERMINAL
 - `-name node-ecom` SETTING A NAME FOR OUR CONTAINER
 - `node-ecom-image` USING OUR EXISTING IMAGE WHICH WE BUILT
