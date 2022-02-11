// https://www.youtube.com/watch?v=rPR2aJ6XnAc&list=PLy1nL-pvL2M5xNIuNapwmABwEy2uifAlY&index=10
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const { resolve } = require('path');
const app = express();



app.use(express.static('./client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res, next) => {
    const path = resolve('./client' + '/index.html');
    res.sendFile(path);
})



app.get('/public-keys', (req, res, next) => {
    res.status(200).json({ key: process.env.STRIPE_PUBLISHABLE_KEY });
});


app.post('/my-route', (req, res, next) => {
    res.status(200).json({ data: req.body });
});


app.post('/webhook', (req, res, next) => {
    const event = req.body;
    console.log("event");
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Checkout session - ', session);
            break;
        case 'payment_intent.created':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent create - ', paymentIntent);
            break;
        default:
            console.log('Unknown event type', event.type);
    }


    res.send({ msg: "success" })
});



// curl -X POST http://localhost:4242/create-payment-intent -H "Content-Type: application/json" -d '{"paymentMethodType": "au_becs_debit", "currency": "aud"}'
app.post('/create-payment-intent', async (req, res, next) => {
    const { paymentMethodType, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: 1999,
                // CHECK WHICH PAYMENT METHOD SUPPORT WHICH CURRENCY // https://stripe.com/docs/api/payment_intents/object#payment_intent_object-payment_method_types - https://stripe.com/docs/api/payment_methods/object
                currency,
                payment_method_types: [paymentMethodType]
            });
        // USE CLIENT SECRET TO CONFIRM THE PAYMENT FROM FRONTEND 
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        // console.log(error);
        res.status(400).json({ error });
    }
});


const port = process.env.PORT || 4242;
app.listen(port, () => console.log('Server is running on : ' + port));