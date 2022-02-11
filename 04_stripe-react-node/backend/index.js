require('dotenv').config({ path: "./.env.dev" });
const cors = require('cors');
const express = require('express');
const createCheckoutSession = require('./routes/checkout.js');
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));


app.get('/', (req, res, next) => {
    res.send("hi")
});



// curl --location --request POST 'http://localhost:8080/create-checkout-session' --header 'Content-Type: application/json' --data-raw '{"line_items": [{"price_data": {"unit_amount": 2000,"currency": "usd","product_data": {"name": "product 1","description": "description 1"} }, "quantity": 2 } ], "customer_email": "example@test.com" }'
app.post('/create-checkout-session', createCheckoutSession);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server is running on : ' + port));