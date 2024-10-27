import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import * as PANOLENS from 'panolens';

import clubhouseImg from '../../assets/clubhouse.jpeg';
import gardenImg from '../../assets/garden.jpg';
import playAreaImg from '../../assets/playArea.jpg';
import gymImg from '../../assets/gym.jpeg';

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null); // Store fetched property data
  const panoramaRef = useRef(null); // Ref to the panorama container
  const navigate = useNavigate(); // Hook to navigate

  // Fetch property details from the API
  useEffect(() => {
    axios
      .get(`https://671be6102c842d92c381b05a.mockapi.io/api/properties/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => console.error('Error fetching property details:', error));
  }, [id]);

  // Navigate to booking page
  const handleBooking = () => {
    // Navigate to the booking page
    navigate(`/booking/${id}`);
  };

  // Initialize the panorama view when the component mounts
  useEffect(() => {
    if (property && property.vrImageUrl) {
      const panorama = new PANOLENS.ImagePanorama(property.vrImageUrl);
      const viewer = new PANOLENS.Viewer({ container: panoramaRef.current });
      viewer.add(panorama);
    }
  }, [property]);

  if (!property) {
    return <Container><p>Loading property details...</p></Container>;
  }

  return (
    <Container className="my-4">
      <Row>
        {/* Property Details */}
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={property.propertyImage} alt={property.propertyName} height={500} />
            <Card.Body>
              <Card.Title>{property.propertyName}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${property.price}<br />
                <strong>Location:</strong> {property.location}<br />
                <strong>Availability:</strong> {property.availability ? 'Available' : 'Unavailable'}<br />
                <strong>Amenities:</strong>
                <Row>
                  <Col md={6}>
                    <Card.Img src={gardenImg} alt="Garden" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <p>🌳 Garden</p>
                  </Col>
                  <Col md={6}>
                    <Card.Img src={clubhouseImg} alt="Clubhouse" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <p>🏠 Clubhouse</p>
                  </Col>
                  <Col md={6}>
                    <Card.Img src={playAreaImg} alt="Play Area" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <p>🏀 Play Area</p>
                  </Col>
                  <Col md={6}>
                    <Card.Img src={gymImg} alt="Gym" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <p>💪 Gym</p>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Booking Button */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <h3>Book this property</h3>
              <Button variant="primary" className="mt-3" onClick={handleBooking}>
                Book Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* VR Mode - 360 Panorama View */}
      {property.vrImageUrl && (
        <Row className="mt-5">
          <Col md={12}>
            <h3>Explore in VR Mode</h3>
            <div
              ref={panoramaRef}
              style={{
                width: '100%',
                height: '500px',
                border: '1px solid #ddd',
              }}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PropertyDetails;
