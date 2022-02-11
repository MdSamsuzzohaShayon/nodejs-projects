import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const PUBLISHABLE_KEY = 'pk_test_51E42CcE15Lqo4v04SEJAcCALt4VQHaInNN7hmRmYH2ZkBMafA5dmnQVimAGgUAGnSU8HFaye1hkfxuBrVo1Omwco00bwhzyIJI';
const stripePromise = loadStripe(PUBLISHABLE_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

