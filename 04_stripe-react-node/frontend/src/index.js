import React from "react";
import ReactDOM from "react-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App.js';

const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
};



const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);


ReactDOM.render(
    <Elements stripe={stripePromise}>
        <App />
    </Elements>
    , document.getElementById('root'));