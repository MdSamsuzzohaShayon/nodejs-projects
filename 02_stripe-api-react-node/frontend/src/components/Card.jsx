import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Card = () => {
    const elements = useElements();
    const stripe = useStripe();


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        // Create payment intent on the server 
        // Confirm the payment on the client 


    }
    return <div className='Card'>
        <h1>Card</h1>
        <form onSubmit={submitHandler} id="payment-form">
            <label htmlFor="card-element">Card</label>
            <CardElement id="card-element" />
            <button>Pay</button>
        </form>
    </div>;
};

export default Card;
