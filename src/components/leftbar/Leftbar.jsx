import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LeftBarFilter = ({ filters = {}, handleFilterChange, resetFilters }) => {
  return (
    <div
      className="left-bar-filter"
      style={{
        width: '250px',
        padding: '20px',
        borderRight: '1px solid #ddd',
        height: '100vh', // Full height of the viewport
        position: 'sticky', // Sticks in place when scrolling
        top: '0', // Stays at the top of the page
      }}
    >
      <Form>
        {/* Name Filter */}
        <Form.Group className="mb-4">
          <Form.Label>Search by Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter property name"
            name="name"
            value={filters.name || ''} // Default to empty string if undefined
            onChange={handleFilterChange}
          />
        </Form.Group>

        {/* Location Filter */}
        <Form.Group className="mb-4">
          <Form.Label>Filter by Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            name="location"
            value={filters.location || ''} // Default to empty string if undefined
            onChange={handleFilterChange}
          />
        </Form.Group>

        {/* Availability Filter */}
        <Form.Group className="mb-4">
          <Form.Label>Filter by Availability</Form.Label>
          <Form.Select
            name="availability"
            value={filters.availability || ''} // Default to empty string if undefined
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </Form.Select>
        </Form.Group>

        {/* Price Filter */}
        <Form.Group className="mb-4">
          <Form.Label>Filter by Max Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter max price"
            name="price"
            value={filters.price || ''} // Default to empty string if undefined
            onChange={handleFilterChange}
          />
        </Form.Group>

        {/* Reset Filters Button */}
        <Button variant="secondary" onClick={resetFilters} className="mb-3">
          Reset Filters
        </Button>
      </Form>
    </div>
  );
};

export default LeftBarFilter;
