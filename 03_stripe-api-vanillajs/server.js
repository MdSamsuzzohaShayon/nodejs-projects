require('dotenv').config();
const express = require('express');
const app = express();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


app.use(express.json());
app.use(express.static('public'));


const storeItems = new Map([
    [1, { priceInCents: 100 * 100, name: "Harry Potter" }],
    [2, { priceInCents: 100 * 200, name: "Percy Jackson" }],
])

app.post('/create-checkout-session', async (req, res, next) => {
    try {
        // IN ORDER TO GET THE INFORMATION FROM CLIENT 
        // https://stripe.com/docs/api/checkout/sessions/list
        // https://stripe.com/docs/api/checkout/sessions/create
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map((item) => {
                const storeItem = storeItems.get(item.id);
                console.log("Store item - ", storeItem);
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        });
        res.json({ url: stripeSession.url });
    } catch (error) {
        console.log("Error: ", error);
        res.status(5000).json({ error: error.message });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running on : ' + port));