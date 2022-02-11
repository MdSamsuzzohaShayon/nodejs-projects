import React, { useState } from 'react';
// RECOMMENDATIONS - CREATE A NEW PAGE FOR CHECKOUT 
import CheckoutForm from './components/CheckoutForm';


function App() {
    const [openCheckout, setOpenCheckout] = useState(false);
    return (
        <div className='App'>
            <h2>Stripe Payment</h2>
            <CheckoutForm />
        </div>
    )
}

export default App;