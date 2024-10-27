import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Carousel, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apartmentImg from '../../assets/luxuryApartment.jpg';
import familyHouseImg from '../../assets/familyHouse.jpeg';
import beachFrontImg from '../../assets/beachfront.jpg';
import '../homePage/homePage.css'; 

const AdminPage = () => {  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For navigation
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [showModal, setShowModal] = useState(false);

  // Fetch properties and bookings on component mount
  useEffect(() => {
    fetchProperties();
    fetchBookings();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties');
      const data = Array.isArray(response.data) ? response.data : [];
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      const data = Array.isArray(response.data) ? response.data : [];
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // HomePage filter logic
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setErrorMessage('Please enter both start and end dates.');
      return;
    }
    setErrorMessage('');
    navigate(`/properties?startDate=${startDate}&endDate=${endDate}`);
  };

  // Admin CRUD functionality
  const openModal = (property = null) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedProperty);
    try {
      if (selectedProperty) {
        // Update property
        const response = await axios.put(`/api/properties/${selectedProperty.id}`, selectedProperty);
        // Update the property in the state to reflect changes in the table
        setProperties((prevProperties) =>
          prevProperties.map((prop) =>
            prop.id === selectedProperty.id ? response.data : prop
          )
        );
      } else {
        // Create new property
        const response = await axios.post('/api/properties', selectedProperty);
        setProperties((prevProperties) => [...prevProperties, response.data]);
      }
      setShowModal(false); // Close modal after submission
    } catch (error) {
      console.error('Error updating/adding property:', error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`/api/properties/${id}`);
      // Remove the property from the state after deletion
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== id)
      );
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  // Property carousel (HomePage)
  const propertiesCarousel = [
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

  return (
    <>
      {/* HomePage Section */}
      <Container fluid className="carousel-container">
        <Carousel className="custom-carousel">
          {propertiesCarousel.map((property, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100 carousel-img" src={property.image} alt={property.title} />
              <Carousel.Caption>
                <h3>{property.title}</h3>
                <p>{property.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container className="my-4">
        <h4>Choose Your Booking Dates</h4>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleFilterSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" type="submit">Check Availability</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Admin Section */}
      <Container fluid className="my-4">
        <Row>
          <Col md={6}>
            <h3>Properties</h3>
            <Button
              onClick={() => openModal()}
              className="btn-lg mb-4"
              style={{ width: '100%', backgroundColor: '#007bff', color: 'white' }}>
              Add Property
            </Button>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(properties) && properties.length > 0 ? (
                  properties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.name}</td>
                      <td>{property.location}</td>
                      <td>${property.price}</td>
                      <td>
                        <Button onClick={() => openModal(property)}>Edit</Button>{' '}
                        <Button onClick={() => deleteProperty(property.id)} variant="danger">Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No properties found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>

          <Col md={6}>
            <h3>Bookings</h3>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Property</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.customerName}</td>
                      <td>{booking.propertyName}</td>
                      <td>{booking.date}</td>
                      <td>
                        <Button variant="danger">Cancel</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Modal for adding/editing properties */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProperty ? 'Edit Property' : 'Add Property'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProperty?.name || ''}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProperty?.location || ''}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, location: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProperty?.price || ''}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, price: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {selectedProperty ? 'Update Property' : 'Add Property'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default AdminPage;
