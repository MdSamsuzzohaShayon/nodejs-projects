import React, { useState } from 'react';
import { useStripe, PaymentElement } from '@stripe/react-stripe-js';

const initialCartItems = [
    {
        price_data: {
            unit_amount: 20 * 100,
            currency: "usd",
            product_data: {
                name: "product 1",
                description: "description 1"
            }
        },
        quantity: 2
    }
]




function CheckoutForm() {
    const [cardItems, setCartItems] = useState(initialCartItems);
    const [customerEmail, setCustomerEmail] = useState();
    const stripe = useState();




    const submitHandler = async (e) => {
        e.preventDefault();
        // CREATE LINE ITEMS , GET EMAIL FROM CUSTOMER, REDIRECT TO STRIPE CHECKOUT PAGE


        try {

            if (cardItems.length < 0) return;
            if (customerEmail === null || customerEmail === '') return;
            const line_items = cardItems;


            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    line_items,
                    customer_email: customerEmail
                })
            }
            const response = await fetch('http://localhost:8080/create-checkout-session', options);
            console.log(response);
            if (response.ok) {
                const text = await response.text();
                const jsonRes = JSON.parse(text);
                const { sessionId } = jsonRes;
                // const { error } = await stripe.redirectToCheckout({ sessionId });
                // if (error) {
                //     console.log(error);
                // }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='CheckoutForm'>
            <h2>Checkout summary</h2>
            <h3>Total items {cardItems.length}</h3>
            <h3>Amount to pay 20$</h3>
            <br />
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input onChange={e => setCustomerEmail(e.target.value)} type="email" name="email" id="email" placeholder='Enter your email' />
                </div>
                <button type="submit">Checkout</button>
            </form>
        </div>
    )
}

export default CheckoutForm;