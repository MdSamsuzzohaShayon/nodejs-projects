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