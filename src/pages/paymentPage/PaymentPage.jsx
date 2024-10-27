import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const PaymentPage = () => {
  const { id } = useParams(); // Property ID from the URL
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  // Function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Razorpay payment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const res = await loadRazorpayScript();

    if (!res) {
      setError('Failed to load Razorpay SDK. Please try again.');
      setLoading(false);
      return;
    }

    // Create an order from the backend
    const order = await axios.post('https://your-backend-url.com/create-order', { propertyId: id })
      .then(response => response.data)
      .catch(() => {
        setError('Error creating Razorpay order. Please try again.');
        setLoading(false);
        return null;
      });

    if (!order) return;

    const options = {
      key: import.meta.env.RAZORPAY_API_KEY_ID, // Replace with your Razorpay Key ID
      amount: order.amount, // Amount in smallest currency unit (e.g., paise)
      currency: order.currency,
      name: 'Property Booking',
      description: `Payment for Property #${id}`,
      order_id: order.id, // Order ID returned by your backend
      handler: async function (response) {
        // Handle successful payment here
        console.log('Payment successful:', response);
        // Verify the payment signature on the backend
        const verifyPayment = await axios.post('https://your-backend-url.com/verify-payment', {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (verifyPayment.data.success) {
          setSuccess(true);
          navigate(`/confirmation/${id}`); // Redirect to confirmation page
        } else {
          setError('Payment verification failed. Please try again.');
        }
      },
      prefill: {
        name: paymentInfo.cardHolderName,
        email: 'user@example.com', // You can get this from the user
        contact: '9999999999', // You can get this from the user
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center">Payment for Property #{id}</h3>
              <Form onSubmit={handlePaymentSubmit}>
                <Form.Group controlId="cardHolderName" className="mb-3">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter cardholder name"
                    name="cardHolderName"
                    value={paymentInfo.cardHolderName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">Payment successful!</p>}

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Processing...' : 'Pay with Razorpay'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
