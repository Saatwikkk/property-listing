import React, { useState } from 'react';
import { Carousel, Container, Form, Row, Col, Button, Alert } from 'react-bootstrap'; // Added Alert for error message
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import apartmentImg from '../../assets/luxuryApartment.jpg';
import familyHouseImg from '../../assets/familyHouse.jpeg';
import beachFrontImg from '../../assets/beachfront.jpg';
import './HomePage.css';  // Import the CSS file for custom styles

const HomePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error message
  const navigate = useNavigate(); // Initialize the navigate function

  const properties = [
    {
      image: apartmentImg,
      title: 'Luxury Apartment',
      description: 'Spacious apartments with modern amenities in the heart of the city.'
    },
    {
      image: familyHouseImg,
      title: 'Family House',
      description: 'A beautiful family home located in a quiet suburb with nearby schools and parks.'
    },
    {
      image: beachFrontImg,
      title: 'Beachfront Villa',
      description: 'An exclusive beachfront villa offering stunning ocean views and luxury living.'
    }
  ];

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    
    // Validate that both startDate and endDate are entered
    if (!startDate || !endDate) {
      setErrorMessage('Please enter both start and end dates.');
      return;
    }
    
    // Clear error message if dates are valid
    setErrorMessage('');

    // Navigate to the property list page with startDate and endDate as query parameters
    navigate(`/properties?startDate=${startDate}&endDate=${endDate}`);
  };

  return (
    <>
      <Container fluid className="carousel-container">  {/* Use fluid container to remove side margins */}
        <Carousel className="custom-carousel">
          {properties.map((property, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 carousel-img"
                src={property.image}
                alt={property.title}
              />
              <Carousel.Caption>
                <h3>{property.title}</h3>
                <p>{property.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Date Filter Section Below Carousel */}
      <Container className="my-4">
        <h4>Choose Your Booking Dates</h4>
        
        {/* Show Error Alert if dates are not provided */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleFilterSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" type="submit">
                Check Availability
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default HomePage;
