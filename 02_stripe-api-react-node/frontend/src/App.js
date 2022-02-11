import React from 'react';
import { Routes, Route } from "react-router-dom";
import PaymentForm from './components/PaymentForm';
import Card from './components/Card';

function App() {
    return <div className="App">
        <Routes>
            <Route path="/" element={<PaymentForm />} />
            <Route path="/card" element={<Card />} />
        </Routes>
    </div>;
};

export default App;
