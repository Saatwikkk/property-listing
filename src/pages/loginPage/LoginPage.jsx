import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // To send login data to the backend

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer', // Default role set to 'customer'
  });
  const [loginStatus, setLoginStatus] = useState(''); // To handle login status/error
  const navigate = useNavigate(); // To handle navigation

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to login the user (replace with your backend API)
      const response = await axios.post('http://localhost:5000/api/login/', formData);

      if (response.status === 200) {
        // Store JWT and role in localStorage for future requests
        localStorage.setItem('token', response.data.token); // If using JWT, save it
        localStorage.setItem('role', response.data.role); // Save the user's role

        // Check user role and redirect based on it
        if (response.data.role === 'admin') {
          navigate('/admin'); // Redirect to admin page
        } else if (response.data.role === 'customer') {
          navigate('/'); // Redirect to home page for customers
        } else {
          setLoginStatus('Unknown role. Please contact support.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>Login</h3>
          {loginStatus && <Alert variant="danger">{loginStatus}</Alert>}
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Login As:</Form.Label>
              <Form.Check
                type="radio"
                id="role-admin"
                label="Admin"
                name="role"
                value="admin"
                onChange={handleInputChange}
              />
              <Form.Check
                type="radio"
                id="role-customer"
                label="Customer"
                name="role"
                value="customer"
                onChange={handleInputChange}
                defaultChecked
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>

          {/* Sign Up Link */}
          <div className="mt-3">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
