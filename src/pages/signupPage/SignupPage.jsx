import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for login redirection
import axios from 'axios'; 

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer' // Default role set to 'customer'
  });
  
  const [signupStatus, setSignupStatus] = useState('');
  const navigate = useNavigate(); // To handle redirection

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to sign up the user (replace with your backend API)
      const response = await axios.post('http://localhost:5000/api/signup/', formData);
      
      if (response.status === 201) {  // Check for a successful response
        if (formData.role === 'customer') {
          // If user signed up as customer, redirect to home
          navigate('/home');
        } else {
          // If user signed up as admin, redirect to admin page
          navigate('/admin');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupStatus('Signup failed. Please try again.');
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>Sign Up</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Sign Up As:</Form.Label>
              <Form.Check
                type="radio"
                id="role-admin"
                label="Admin"
                name="role"
                value="admin"
                onChange={handleInputChange}
                checked={formData.role === 'admin'}
              />
              <Form.Check
                type="radio"
                id="role-customer"
                label="Customer"
                name="role"
                value="customer"
                onChange={handleInputChange}
                checked={formData.role === 'customer'}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>

          {/* Display signup status */}
          {signupStatus && <p className="mt-3">{signupStatus}</p>}

          {/* Link to login page */}
          <div className="mt-3">
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
