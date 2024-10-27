import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PaymentForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Call the backend to create a payment intent
    try {
      const { data } = await axios.post('http://localhost:5000/api/create-payment-intent', {
        amount: amount * 100, // Convert amount to cents
      });

      const { clientSecret } = data;

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement />
      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      <Button variant="primary" type="submit" disabled={!stripe || isLoading} className="mt-3">
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </Form>
  );
};

export default PaymentForm;
