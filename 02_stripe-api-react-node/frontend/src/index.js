import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


(async () => {

    const { publishbaleKey } = await fetch('/config').then(r => r.json());
    const stripePromise = loadStripe(publishbaleKey);
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();