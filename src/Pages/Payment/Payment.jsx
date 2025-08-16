import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PayForm from './PayForm';
import Banner from './Banner';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
console.log("Stripe Key:", import.meta.env.VITE_Payment_Key);
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PayForm />
        </Elements>
        
    );
};

export default Payment;