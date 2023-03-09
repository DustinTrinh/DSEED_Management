import React, { Fragment } from 'react';
import { Stripe } from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripeTestPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
export default function StripeContainer() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY,
      };

  return (
    <Fragment>
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    </Fragment>
  )
}
