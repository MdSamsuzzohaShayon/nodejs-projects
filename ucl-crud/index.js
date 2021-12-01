const express = require('express');
const homeRoute = require('./routes/home');
const keys = require('./config/keys')
const club = require('./models/Club');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();



// CONNECTING TO MONGODB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(console.log("mongodb is connected successfully"))
    .catch(err=>console.log("An error is occered to connect to db"));





// MIDDLEWARE SETUP 
//VIEW ENGINE SETUP
app.set('view engine', 'ejs');
// STATIC FOLDER SETUP
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())




// ROUTING 
app.use('/', homeRoute);




// RUNNING SERVER 
const PORT = process.env.PORT || 8000;

// STARTING THE SERVER
app.listen(PORT, ()=>{
    console.log('This app is rrunning on:', PORT);
})