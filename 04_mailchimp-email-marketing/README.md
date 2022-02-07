## [Tutorial](https://www.youtube.com/watch?v=JLKzr83xZGo)

 - __https://www.youtube.com/watch?v=CAPaHp7l1-I&list=PLpPnRKq7eNW08GdKgS3ar2kg9-CiYWxN2&index=6__



 - Create a account in mailchimp -> audiance -> manage audiance
 - Get the [audiance id](https://us20.admin.mailchimp.com/lists/settings?id=20965) from there 
 - [API first call or base endpoint](https://mailchimp.com/developer/guides/marketing-api-quick-start/#make-your-first-api-call)

 - Get api key from -> [account](https://us20.admin.mailchimp.com/account/) -> extras

 - [Send your first email](https://mailchimp.com/developer/guides/send-your-first-transactional-email/#send-your-first-email)

 ```
 const mailchimp = require("mailchimp_transactional")(
  "YOUR_API_KEY"
);

const message = {
  from_email: "hello@example.com",
  subject: "Hello world",
  text: "Welcome to Mailchimp Transactional!",
  to: [
    {
      email: "freddie@example.com",
      type: "to"
    }
  ]
};

async function run() {
  const response = await mailchimp.messages.send({
    message
  });
  console.log(response);
}
run();
 ```

 - [Marketing list api](https://mailchimp.com/developer/api/marketing/lists/)




<hr />
<hr />




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




