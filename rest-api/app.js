//THIS IS FOR SPINNING EXPRESS
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();




//REQUEST ARE FORWAREDED
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');




mongoose.connect("mongodb+srv://shayon:shayon@cluster0.hexfa.mongodb.net/rest-api?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true },()=>console.log('Mongodb is connected'));




// BY USING MORGAN WHEN WE REQUESTWE CAN SEE EXTRA LOG SING IN TERMINAL WHEN NODEMON RUNNING
// funnel all request though morgan
app.use(morgan('dev')); // FORMAT FOR OUTPUT
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: false
})); // TRUE ALL EXTENDED BODY WITH REACH DATA. FALSE FOR ONLY SUPPORT URL ENCODDED DATA
app.use(bodyParser.json());









app.use((req, res, next) => {
    // * FOR ALLOW ANYTHIN
    res.header('Access-Control-Allow-Origin', "*");
    // PARTICULAR HEADER APPENDED TO INCOMMING REQUEST
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //OPTIONS REQUEST IS FOR FINDING OUT WHICH REQUEST WE HAVE
    // BROWSER WILL ALWAYS SEND AN OPTIONS REQUEST FIRST 
    //METHOD IS A PROPERTY WHICH ASSCESS TO THE HTTP METHOD USED ON THE REQUEST
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});






// next use move the request to the next middleware
//INCOMING REQUEST GO THOUGH APP
// ROUTE WHICH SHOULD HANDLE REQUEST
app.use('/products', productRoute);
app.use('/orders', orderRoute);


//URL ERROR HANDLING
app.use((req, res, next) => {
    //ERROR OBJECT IS AVAILABLE BY DEFAULT
    const error = new Error('Not found');
    error.status = 404;
    // NEXT WILL FORWARD THE ERROR REQUEST INSTAND OF ORIGINAL ONE
    next(error);
});


//THIS WILL HANDLE ALL KIND OF ERROR
// ERROR THOROWS FROM ANYWARE ELSE FROM THE APPLICATION
// THIS WILL NOT HAPPEN YET
// EXAMPLE THIS ERROR WILL HAPPEN WHEN I ADD DATABASE
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});



// WE ARE WORKING WITH EXPRESS BUT WE ARE NOT MAKING SERVER HERE
module.exports = app;