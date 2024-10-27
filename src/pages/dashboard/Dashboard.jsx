import React, { useState } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apartmentImg from '../../assets/luxuryApartment.jpg';
import familyHouseImg from '../../assets/familyHouse.jpeg';
import beachFrontImg from '../../assets/beachfront.jpg';

const Dashboard = () => {
  const navigate = useNavigate(); 
  
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

  // Handle login and signup button clicks
  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleSignup = () => {
    navigate('/signup'); 
  };

  return (
    <>
      <Container fluid className="carousel-container">
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

      {/* Buttons for Login and Signup */}
      <Container className="my-4">
        <h4>Welcome to the Property Booking Dashboard</h4>
        <p>Please log in or sign up to view properties and make bookings.</p>
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleLogin} className="mx-2">
              Login
            </Button>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Button variant="secondary" onClick={handleSignup} className="mx-2">
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
