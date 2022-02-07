const express = require('express');
const path = require('path');
const webpush = require('web-push');
const bodyParser = require('body-parser');

const app = express();


//SET STATIC PATH
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());



// NO PROBLEM IF ANYONE SEE PUBLIC KEY
const publicVapidKey = 'BCiKcp5g2womLcvmkihsoXcw9QhEW3P31HrxcbePogD8yv_Z0_UNReOcWiUbDilf93oh8KGcbJGQELRSkkVOQkY';

// THIS KEY SHOULD BE HIDDEN
const privateVapidKey = 'XnhlOjc-D0soiEPClW5nnc4YHmUCeoqU8-1y0VFO6wo';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);


//SUBSCRIBE ROUTE
app.post('/subscribe', (req, res, next) => {
    
    //GET PUSH SUBSCRIPTION OBJECT
    const subscription = req.body;

    // SEND 201 - RESOURCE CREATED
    res.status(201).json({});

    //CREATE PLYLOAD THIS IS OPTIONAL
    const payload = JSON.stringify({title: "Push test"});

    //PASS OBJECT INTO SEND NOTIFICATIONS
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));



});



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`The server is running in http://localhost:${PORT}`));