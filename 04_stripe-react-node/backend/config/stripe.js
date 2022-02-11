const stripeSDK = require('stripe')(process.env.TEMP_SECRET_KEY);


module.exports = stripeSDK;