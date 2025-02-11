import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FinincalTips from "../components/FinincalTips";
import SignUpForm from "../components/SignUpForm";

const Signup = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded ">
        <Col md={6}>
          <FinincalTips />
        </Col>
        <Col md={6}>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
