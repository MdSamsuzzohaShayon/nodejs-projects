[*Youtube tutorial*](https://www.youtube.com/watch?v=HlYFW2zaYQM&t=12s)

## planning 

 *create a server site scripts that's going to accept
 an endpoint so we're gonna have an endpoint with
 express called subscribe. in client site we want
 to send a subscription object to the server then 
 the server will trigger the service worker to show 
 the notifications* 


## web-push

*Web push requires that push messages triggered from a backend be done via
the Web Push Protocol and if you want to send data with your push message,you must also encrypt that data according to the Message Encryption for Web Push spec.*

*This module makes it easy to send messages and will also handle legacy support for browsers relying on GCM for message sending / delivery.*

```npm install web-push```

[*web-push on github*](https://github.com/web-push-libs/web-push)

#### generate vapid keys

 - access location of web push 
 ```
 cd node_modules\.bin
 web-push generate-vapid-keys
 ``` 
 - paste in command pompet *it will give a public and private key*
 - to identify who is sending notifications
 - When using your VAPID key in your web app, you'll need to 
 convert the URL safe base64 string to a Uint8Array to pass into 
 the subscribe call, [*which you can do like*](https://github.com/web-push-libs/web-push#using-vapid-key-for-applicationserverkey)
 - in url go to i sign view site informations -> allow -> it will show 


## service workers

 - [*in debth guide in official site*](https://developers.google.com/web/fundamentals/primers/service-workers/)
 - [*more readable guide about service worker*](https://medium.com/commencis/what-is-service-worker-4f8dc478f0b9)






 [*generate notifications*](https://tests.peter.sh/notification-generator/)



