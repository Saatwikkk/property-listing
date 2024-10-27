import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios'; // For making API calls to check bookings

const BookingPage = ({ property }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [isDateAvailable, setIsDateAvailable] = useState(true); // Track date/time availability

  // Validate date and time before proceeding with booking
  const validateBooking = async () => {
    try {
      const response = await axios.get(`/api/bookings/validate?propertyId=${property.id}&date=${bookingDate}&time=${bookingTime}`);
      
      // If bookings already exist at the selected time, prevent the booking
      if (response.data.isBooked) {
        setIsDateAvailable(false);
        setBookingStatus('Selected date and time are not available. Please choose another slot.');
      } else {
        setIsDateAvailable(true);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setBookingStatus('Error validating booking. Please try again later.');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingDate || !bookingTime) {
      setBookingStatus('Please select a booking date and time.');
      return;
    }

    // Validate the selected date and time
    await validateBooking();

    if (isDateAvailable) {
      setBookingStatus('Booking successful!');
      // Optionally, send the booking request to the server to confirm
      // axios.post('/api/bookings', { propertyId: property.id, date: bookingDate, time: bookingTime });
    }
  };

  // Check if property is defined, and render only when available
  if (!property) {
    return (
      <Container className="my-4">
        <Row>
          <Col md={8}>
            <h3>Loading property details...</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={8}>
          <h3>Booking for: {property.name}</h3>
          <Card>
            <Card.Body>
              <Form onSubmit={handleBooking}>
                <Form.Group>
                  <Form.Label>Select Booking Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Select Booking Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4" disabled={!isDateAvailable}>
                  Book Now
                </Button>
              </Form>
              {bookingStatus && <p className="mt-3">{bookingStatus}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
