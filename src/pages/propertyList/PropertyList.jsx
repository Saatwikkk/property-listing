import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import LeftBarFilter from '../../components/leftbar/Leftbar'; // Import LeftBarFilter component

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    availability: '',
    price: ''
  });

  // Fetch properties from the API when the component mounts
  useEffect(() => {
    axios
      .get('https://671be6102c842d92c381b05a.mockapi.io/api/properties/properties')
      .then((response) => {
        let data = Array.isArray(response.data) ? response.data : [];

        // Make all properties available
        data = data.map(property => ({
          ...property,
          availability: true // Force availability to true for all properties
        }));

        setProperties(data); // Store the fetched properties
        setFilteredProperties(data); // Initially, show all properties
      })
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Update the filters state and trigger filtering
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply the filters when the filter state changes
  useEffect(() => {
    let filtered = properties;

    // Apply name filter with optional chaining to handle undefined names
    if (filters.name) {
      filtered = filtered.filter((property) =>
        property.propertyName?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Apply location filter with optional chaining to handle undefined locations
    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply availability filter (no need to filter since all are available)
    if (filters.availability) {
      filtered = filtered.filter((property) => {
        return filters.availability === 'available'
          ? property.availability
          : !property.availability;
      });
    }

    // Apply price filter
    if (filters.price) {
      filtered = filtered.filter(
        (property) => Number(property.price) <= Number(filters.price)
      );
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      name: '',
      location: '',
      availability: '',
      price: ''
    });
    setFilteredProperties(properties); // Reset to original property list
  };

  return (
    <Container fluid style={{ paddingTop: 0, marginTop: 15 }}>
      <Row style={{ margin: 0 }}>
        {/* Left Bar with Filters */}
        <Col md={3} style={{ padding: 0 }}>
          <LeftBarFilter
            filters={filters}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
        </Col>

        {/* Property Cards */}
        <Col md={9} style={{ padding: 0 }}>
          <Row style={{ margin: 0 }}>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card>
                    {/* Property Image */}
                    <Card.Img
                      variant="top"
                      src={
                        property.propertyImage ||
                        'https://loremflickr.com/640/480/city'
                      } // Fallback if no image
                      alt={property.propertyName}
                      style={{ height: '200px', objectFit: 'cover' }} // Ensure consistent image sizing
                    />

                    {/* Property Details */}
                    <Card.Body>
                      <Card.Text>
                      <Card.Title>{property.propertyName || 'Unnamed Property'}</Card.Title> {/* Property name displayed here */}
                        <strong>Price:</strong> ${property.price}
                        <br />
                        <strong>Location:</strong> {property.location || 'Location Unavailable'}
                        <br />
                        <strong>Availability:</strong> Available {/* All properties are marked as available */}
                      </Card.Text>
                      <Button variant="primary" href={`/property/${property.id}`}>
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyList;
