// AUTHENTICATE CUSTOMERS
/*
const stripe = require('stripe')('sk_test_51E42CcE15Lqo4v04MqkPp6IKfLNeT1HrYRxqqzROZodkVQZctAn6t3B1Jweq8aUEzUO1eFEcqHYvq90fxGCYa4uT0066bovsYI');


(async () => {
    // https://stripe.com/docs/api/customers/list
    // Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.
    const customers = await stripe.customers.list();
    console.log(customers);

    const customerId = 'cus_FY4Ej0urgyBqeK';
    const customer = await stripe.customers.retrieve(customerId);
    console.log(customer);





    // IF I AM USING MULTIPLE STRIPE ACCOUNT FOR INTEGRATION NOT THOUGH CONNECT I MIGHT NEED TO SWAP MY API KEY PER REQUEST
    // API KEY PER REQUEST
    // const stripe = require('stripe')
    // const customer = await stripe.customers.retrieve(customerId, {api_key: 'sk_test_51E42CcE15Lqo4v04MqkPp6IKfLNeT1HrYRxqqzROZodkVQZctAn6t3B1Jweq8aUEzUO1eFEcqHYvq90fxGCYa4uT0066bovsYI'});
    // console.log(customer);

})();
*/









// WITH CONNECT


(async () => {
    const stripe = require('stripe')('sk_test_51E42CcE15Lqo4v04MqkPp6IKfLNeT1HrYRxqqzROZodkVQZctAn6t3B1Jweq8aUEzUO1eFEcqHYvq90fxGCYa4uT0066bovsYI');
    const customerId = 'cus_FY4Ej0urgyBqeK';
    const accountId = "acct_1E42CcE15Lqo4v04"; // https://dashboard.stripe.com/settings/account
    const customer = await stripe.customers.retrieve(customerId, { stripeAccount: accountId });
    console.log(customer);


})();