// https://www.youtube.com/watch?v=_Ayi6wohGkc&list=PLy1nL-pvL2M5xNIuNapwmABwEy2uifAlY&index=2
const stripe = require('stripe')('sk_test_51E42CcE15Lqo4v04MqkPp6IKfLNeT1HrYRxqqzROZodkVQZctAn6t3B1Jweq8aUEzUO1eFEcqHYvq90fxGCYa4uT0066bovsYI');

(async () => {
    // CREATE CUSTOMER WITH NO PARAMS 
    // const customer = await stripe.customers.create({});
    // WITH EMAIL AND NAME 
    // const customer = await stripe.customers.create({ name: "name1", email: "email1name@gmail.com" });
    // console.log(customer);


    // CREATE CUSTOMER WITH NESTED OBJECT 
    const customer = await stripe.customers.create({
        payment_method: 'pm_card_visa', // The ID of the PaymentMethod to attach to the customer.
        invoice_settings: {
            default_payment_method: "pm_card_visa" // ID of a payment method that’s attached to the customer, to be used as the customer’s default payment method for subscriptions and invoices.
        }
    });


    console.log(customer);

})();