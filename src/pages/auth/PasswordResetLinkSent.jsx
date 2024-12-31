import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PasswordResetLinkSent = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col md={12}>
          <Card className="text-center p-4">
            <Card.Body>
              <Card.Title>Password Reset Link Sent</Card.Title>
              <Card.Text>
                A link to reset your password has been sent to your email address. Please check your inbox and follow the instructions.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/login')} style={{ backgroundColor: '#ee4710' }}>
                Go to Login Page
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordResetLinkSent;