import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// card element form accepting card Number,  cvc, postal code 
// There are many different kinds of Elements, useful for collecting different kinds of payment information. These are the available Elements today.
// https://stripe.com/docs/stripe-js/react#available-element-components

const PaymentForm = () => {
    const elements = useElements(); // locating and and accessing mounted element on the page
    const stripe = useStripe(); // return a referance to stripe instance that was passed down to element provider // intregate like tokenize payment method


    const handleSubmit = async (e) => {
        e.preventDefault();
        // MAKE AJAX REQUEST TO CREATE A PAYMENT INTENT
        // CHECKOUT SESSION 
        // WORKING WITH STRIPE OBJECT TO REDIRECT 



        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement); // referance to the element
        console.log("Card - ", cardElement);
        console.log("Stripe - ", stripe);


        // CONFIRM THE PAYMENT INTENT ON THE SERVER
        const { error: backendError, clientSecret } = await fetch('http://localhost:4242/create-payment-intent', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                paymentMethodType: "card",
                currency: 'eur'
            })
        })
            .then(r => r.json());


        if (backendError) {
            console.log("Backend error - ", backendError);
            return;
        }

        // CONFIRM PAYMENT ON THE CLIENT
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (stripeError) {
            console.log("Stripe error - ", stripeError);
            return;
        }

        console.log("Payment Intent ", paymentIntent);
        console.log("Payment Intent status ", paymentIntent.status);
        console.log("Payment Intent id ", paymentIntent.id);

    }
    return (
        <div className='PaymentForm'>
            <form onSubmit={handleSubmit} >
                <CardElement />
                <button>Pay</button>
            </form>
        </div>
    )
}

export default PaymentForm;