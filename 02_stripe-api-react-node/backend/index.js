// https://www.youtube.com/watch?v=lbEFSP1WAv0
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // PUBLISHABLE_KEY
const uuid = require('uuid');

const app = express();


app.use(express.json());
app.use(cors());

app.get('/test', (req, res, next) => {
    res.status(200).json({ msg: "Success" });
});




app.post('/payment', async (req, res, next) => {


    try {
        const { product, token } = req.body;
        console.log("PRODUCT ", product);
        console.log("TOKEN ", token);

        const idempotencyKey = uuid();

        //An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard. https://stripe.com/docs/api/customers // https://stripe.com/docs/api/idempotent_requests
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        console.log("Customer - ", customer);

        // To charge a credit card or other payment source, you create a Charge object. If your API key is in test mode, the supplied payment source (e.g., card) won’t actually be charged, although everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully). // https://stripe.com/docs/api/charges
        const charge = await stripe.charges.create({
            amount: product.price * 100, //(13 cents x 100 = 13 USD)
            currency: 'usd', // https://stripe.com/docs/currencies
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: { // https://stripe.com/docs/api/charges/create#create_charge-shipping
                name: token.card.name,
                address: {
                    country: token.country.address_country
                }
            }
        }, { idempotencyKey });

        console.log(charge);

        res.status(200).json(charge);
    } catch (error) {
        throw error;
    }
});

app.get('/config', (req, res, next) => {
    res.json({ publishbaleKey: process.env.STRIPE_PUBLISHABLE_KEY })
});


const port = process.env.PORT || 4242;
app.listen(port, () => console.log('Server is running on : ' + port));