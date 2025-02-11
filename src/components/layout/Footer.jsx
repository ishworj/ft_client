import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";

const Footer = () => {
  return (
    <Container fluid className="bg-dark p-5 ">
      <Row className="text-center">
        <Col>
          &copy; copy right all reserved. || Made by{" "}
          <a href="" target="blank">
            Ishwor karki
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer