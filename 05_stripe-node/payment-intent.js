// https://stripe.com/docs/payments/payment-intents
// https://www.youtube.com/watch?v=_Ayi6wohGkc&list=PLy1nL-pvL2M5xNIuNapwmABwEy2uifAlY&index=2
const stripe = require('stripe')('sk_test_51E42CcE15Lqo4v04MqkPp6IKfLNeT1HrYRxqqzROZodkVQZctAn6t3B1Jweq8aUEzUO1eFEcqHYvq90fxGCYa4uT0066bovsYI');


// Use the Payment Intents API to build an integration that can handle complex payment flows.It tracks a payment from creation through checkout, and triggers additional authentication steps when required.
// Some of the advantages of using the Payment Intents API include:
// Automatic authentication handling
// No double charges
// No idempotency key issues
// Support for Strong Customer Authentication(SCA) and similar regulatory changes


(async () => {

    /*
    // CREATE A PAYMENT INTENT TO CONFIRM 
    const intent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd"
    });

    // console.log(intent.id); // pi_3KRbWKE15Lqo4v040yQOvHOs
    // console.log(intent.status); // requires_payment_method

    // console.log("BREAK");


    const paymentIntentId = intent.id; // pi_3KRbWKE15Lqo4v040yQOvHOs
    // https://stripe.com/docs/api/payment_intents/confirm?lang=node
    // To create a PaymentIntent for confirmation, see our guide at: https://stripe.com/docs/payments/payment-intents/creating-payment-intents#creating-for-automatic
    const paymentIntent = await stripe.paymentIntents.confirm(
        paymentIntentId,
        { payment_method: 'pm_card_visa' }
    );
    // console.log(paymentIntent.id); // pi_3KRbPLE15Lqo4v040dP8eNRR
    // console.log(paymentIntent.status); // succeeded
    */





    // FETCH LINES  - https://stripe.com/docs/api/invoices/invoice_lines?lang=node
    // When retrieving an invoice, you’ll get a lines property containing the total count of line items and the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.
    //GET INVOICE ID -  curl https://api.stripe.com/v1/invoices -u sk_test_51E42CcE15Lqo4v04MqkPp6IKfLNeT1HrYRxqqzROZodkVQZctAn6t3B1Jweq8aUEzUO1eFEcqHYvq90fxGCYa4uT0066bovsYI: -d limit=3 -G
    const invoiceId = "in_1KRbjLE15Lqo4v04rXygm0Ji"
    const lines = await stripe.invoices.listLineItems(invoiceId, { limit: 5 });
    console.log(lines);

})();