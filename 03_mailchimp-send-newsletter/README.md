## Static file

In this project we will not use any template engine
index.html should load without a route

*routing static files*

http://localhost:5000/failed.html
http://localhost:5000/success.html

## using bootswatch

[website](https://bootswatch.com/)

click on download of slate

copy the link of [code](https://bootswatch.com/4/slate/bootstrap.min.css)

use font awesome

## request module

Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

```npm install request```

I will request to mailchimp api with request module.

## mailchimp

mailchimp developer [website](https://developer.mailchimp.com/documentation/mailchimp/)

 - get started -> before you [started](https://developer.mailchimp.com/documentation/mailchimp/guides/get-started-with-mailchimp-api-3/#before-you-start)

 https://<dc>.api.mailchimp.com/3.0

 here dc means data center that we can find after sign up to mailchaimp 
 in home page url we can find like 

 ***this:*** https://us20.admin.mailchimp.com/

 here us20 is our data center

get all diffrent mailchimp in points

 [API Referance](https://developer.mailchimp.com/documentation/mailchimp/reference/overview/)

[lists](https://developer.mailchimp.com/documentation/mailchimp/reference/lists/)

 - go to list settings -> rename and save
 - there find the id

 - from navbar dropdown -> account -> extras -> api key -> create a key

 ***api key***
 ```1004185084ca3ba8b2c2ad3133f60a6c-us20```

[req body perameters](https://developer.mailchimp.com/documentation/mailchimp/reference/lists/#create-post_lists_list_id)

find example below in the page

***marge fields and extra data***

 - list -> go to list setting -> settings drop down -> list fields and marge tag



