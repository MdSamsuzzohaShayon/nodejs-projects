const stripeSDK = require('../config/stripe.js');

async function createCheckoutSession(req, res) {
    const domainUrl = process.env.FRONTEND_URL;
    const { line_items, customer_email } = req.body;


    // CHECK LINE ITEMS AND CUSTOMER EMAIL 
    if (!line_items || !customer_email) {
        return res.status(400).json({ error: "Missing required session parameter" });
    }


    const productPrice = [
        {
            unit_amount: 2000,
            currency: 'usd',
            recurring: { interval: 'month' },
            product: 'prod_L7TB77mvSxaMcz',
        }
    ];


    // for (let i = 0; i < line_items.length; i++) {
    //     line_items[i].price = productPrice[0];
    // }


    // console.log(line_items);


    try {
        const session = await stripeSDK.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: "payment",
            customer_email,
            success_url: `${domainUrl}/success/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/cancel/?session_id={CHECKOUT_SESSION_ID}`,
            // shipping_address_collection: {allowed_countries: ['GB', 'US']}
        });
        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Error: Unable to create session" });


    }
}



module.exports = createCheckoutSession;