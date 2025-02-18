import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FinincalTips from "../components/FinincalTips";
import SignUpForm from "../components/SignUpForm";

const Signup = () => {
  return (
    <Container className="p-3">
      <Row
        className=" p-5  rounded"
      >
        <Col md={6} style={{ backgroundColor: "black" }}>
          <FinincalTips />
        </Col>
        <Col md={6} style={{ backgroundColor: "black" }}>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
