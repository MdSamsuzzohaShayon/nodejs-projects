import React from 'react';
import { CardElement, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const elements = useElements();


    const submitHandler = (e) => {
        e.preventDefault();

        const cardElement = elements.getElement(CardElement);
        console.log(cardElement);
    }
    return <div>
        <form onSubmit={submitHandler}>
            <CardElement />
            <button>Pay</button>
        </form>
    </div>;
};

export default PaymentForm;
