import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import SignInForm from "../components/SignInForm.jsx";

const Login = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded ">
        <Col md={6}>
          <SignInForm />
        </Col>
        <Col md={6}>
          <div
            className="d-flex flex-column justify-content-center gap-3 fs-1 "
            style={{ height: "100%" }}
          >
            <div className="text-danger text-decoration-line-through">
              <FaArrowTrendDown />
              Reduce your expenses
            </div>
            <div className="text-success">
              <FaArrowUpShortWide />
              Increase your income by tracking
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
