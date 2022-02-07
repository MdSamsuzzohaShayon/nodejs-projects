## test with card number

[few card number you can get for testing](https://stripe.com/docs/quickstart)
4242 4242 4242 4242
 - regestration info saved in professional address
 - go to stripe website create an accound for api
 - paoyments -> create new payments
 - setting -> activate test mode for only testing
 - business setting -> data -> delete all test data

## checkout box

as long as we use for test 4242 4242 4242 4242 this number
rest of the form doesn't metter
logo for checkout box name must be marketplace.png

## backend sumit

succesfully send with stripe. see in console after submit

create a /charge directory for create and submission
Submit forms
check in stripe website there will add some customers and payments

## deploy in heroku

[download Heroku cli](https://devcenter.heroku.com/articles/heroku-cli)
install it on local machine

## heroku commands

open git bash in root folder and paste the command
or open cmdas admin go to root folder
```
heroku login
heroku create
```

from heroku dashboad 
 - click app we made -> deploy -> follow the command from there
```
git push heroku master
heroku open
```

### if anything wrong
``` 
git logs
```

## heroku setup

 - dashboard-> payments-> setting -> reveal config vars
### set publishable key and secret key
 - key ```STRIPE_PUBLISHABLE_KEY```
 - value```pk_test_6LkmCRQACKmXir448eUjc2AW```
 - key ```STRIPE_SECRET_KEY```
 - value```sk_test_T7IlrPhRmz348L5V5kN5tEB2```





