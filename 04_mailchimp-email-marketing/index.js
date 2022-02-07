const express = require('express');
const request = require('request');
const path = require('path');
const keys = require('./config/keys');

const app = express();



app.set("view engine", "ejs");
// app.use((req, res, next) => {
//     res.header({"Access-Control-Allow-Origin": "*"})});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




/*
// FOR NOW LETS USE HTML STATIC SITE FOR SENDING REQUEST TO BACKEND 
// WILL USE GET REQUEST WHEN WILL SEND REQUEST FROM BACKEND TO BACKEND 
app.get('/', (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    res.render("index");
});
*/


app.post('/subscribe', (req, res, next) => {
    console.log("Post method: ", req.body);
    addEmailToMailchimp(req.body.email);
    const { email, js } = req.body;






    // res.redirect('/');
});



function addEmailToMailchimp(email) {
    const request = require('request');
    const options = {
        'method': 'POST',
        'url': 'https://us20.api.mailchimp.com/3.0/lists/905728b852/members',
        'headers': {
            'Authorization': 'Basic YW55c3RyaW5nOjEwMDQxODUwODRjYTNiYThiMmMyYWQzMTMzZjYwYTZjLXVzMjA=',
            'Content-Type': 'application/json',
            'Cookie': 'ak_bmsc=CDF4777109A344B7514959F8F067B11317372E160831000035DAD15F1B57F12B~plqcXEUhJ0v4zCamoim/YX8/Ze78euw98VeAtg6OVmQdsMNEMD++VrZ1yYFzE+Esdg94ahQMHNYucOFg/FRtkIQgMih+6mr+hTOcilelNG1GRhV959wuEWKYt6EAAnrqutiphgoWypMDJBTd0M076CDZzHgdZZCDzep85uWfV7rE4ooshLRr9TtBoSqpp2t2jHe4RX/DCmxAVKncLT/pCfWiBjcg5waIw6fzq90QVEUhY=; bm_sv=A6B94F86792428EF210C3FE33E53B4FC~n6LPQa4svftrXzim5wLBbtfNJwOIemCROIC5FXTQfLNUePSx87IzluZPa8mMRTDRBvXZinV+3MlBjNgEnKlIV+aAXKsPamyX5PuK9Vn3PsVrfICp7bnjxPiL3M284Orup6Lb3WdP+bKbqHRQJik/+8z4rEkV5rC65IbG/Gc+3qs='
        },
        body: JSON.stringify({ "email_address": email, "status": "subscribed" })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}




const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on : ' + port));