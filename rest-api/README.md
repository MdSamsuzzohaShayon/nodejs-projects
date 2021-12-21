## REST API (Representational State Transfer)

Representational State Transfer is a software architectural style that defines a set of 
constraints to be used for creating Web services. Web services that conform to the REST 
architectural style, termed RESTful Web services, provide interoperability between 
computer systems on the Internet. 

REST or RESTful API design (Representational State Transfer) is designed to take advantage 
of existing protocols. While REST can be used over nearly any protocol, it usually takes 
advantage of HTTP when used for Web APIs.

[essential website for learning rest api or referance of rest api](https://www.restapitutorial.com/)


## postman

paste url in past man
see for all (get, post, delete, patch)
```
http://localhost:5000/products
http://localhost:5000/products/id
http://localhost:5000/products/special

http://localhost:5000/orders
http://localhost:5000/orders/id
```

make a post request 
```
http://localhost:5000/products
http://localhost:5000/orders
```
body-> row -> JSON(application.json).
#### for products
```
{
    "name" : "happy potter",
    "price" : 30
}
```
#### for orders
```
{
    "productId" : "jjhjheu23j3h45jbhb5_j/df",
    "quantity" : "10"
}
```
#### save products data to database
`http://localhost:3000/products`
```
{
    "name": "Harry Potter",
    "price": 299
}
```
#### find data by id
```
http://localhost:3000/products/5c71bdcd3010fb0880f1ce3a
```

#### patch update request
```
[
	{"propName": "name" , "value": "harry potter 7 "	}
]
```
``
[
	{"propName": "name", "value": "Something more useful"}	
]
``




## http status code

[all code](https://www.restapitutorial.com/httpstatuscodes.html)

## morgan

HTTP request logger middleware for node.js

behind the scene morgan will call the next function that dont't 
return response just locked something.
see the result in terminal when we request something


```
npm install morgan
```

## body parser

parse the body of incoming request. body-parser doesn''t support files.
but it uspport url encoded bodies and json. 
Node.js body parsing middleware.
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

```
npm install body-parser
```


## cors (cross prigin resource sharing)

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

```npm install cors```


## MongoDB Atlas
 - Sign In
 - Create a new project
 - Create a new cluster 
 - AWS -> any country with free tier available
 - cluster tier -> M0
 - name the cluster
 - security -> add new user
 - New clusters take between 7-10 minutes to provision.
 - user name and password is "admin"
 - security -> whitelist ip
 - overview -> connect - connect your application -> 
 - copy standard connection string
 - view driver connection examples -> node 
 - (we can follow thein instrucion or we can use mongoose)

## nodemon.json 

this is for password setup for production


Create descriptive api if I plan to use them pbulically


## postman order request

#### create order
```
{
	"productId": "5c72e6a218152416007fff3a",
	"quantity": "2"
}
```

if i don't pass quantity it will give default euantity 1

#### store data

```
{
"productId": "5c72f8c1eb666b2c346a1d26"
}
```

## multer

Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

multer is like body parser can parse body. In some case body parser can't 
handle there we can use multer

```
npm install multer
```

## postman

make a post request for uploading image
url http://localhost:3000/product
 - Headers -> uncheck checkbox
 - Body -> form-data (radio button)
 - fill key value for price and name
 - 3rd key productImage -> make it file type
 - in value upload an image
 - if we make a post request we will have an upload folder with a new file
 
 paste this url in browser. this url we can get from console
 http://localhost:3000/2019-02-25T14-52-22.919ZScreenshot%20(28).png