import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import CustomInput from "../components/CustomInput";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
const Contact = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    toast.success("your enquiry was submitted , you will get reply soon")
    setForm(initialState);
  };
  return (
    <Container className="p-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4">We're Here to Help!</h1>
          <p className="lead">
            Have a question or need assistance? Fill out the form below and
            we’ll get back to you as soon as possible.
          </p>
        </Col>
      </Row>
      <Row className="bg-dark p-5 rounded ">
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Container className="p-0">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ishowr karki"
                      required
                      onChange={handleOnChange}
                      name="name"
                      value={form.name}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      required
                      onChange={handleOnChange}
                      name="email"
                      value={form.email}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="A brief topic of message"
                required
                onChange={handleOnChange}
                name="subject"
                value={form.subject}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Your enquiry here ..."
                required
                onChange={handleOnChange}
                name="message"
                value={form.message}
              />
            </Form.Group>

            <div className="d-grid mt-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="bg-dark p-5 rounded ">
        <Col>
          <h3 className="mb-3">FAQS</h3>
          <Accordion className="bg-dark">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I add a transaction?</Accordion.Header>
              <Accordion.Body>
                Go to the Transactions Page or Dashboard, click "Add
                Transaction," enter the details, and save.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Where can I see my total balance?
              </Accordion.Header>
              <Accordion.Body>
                Your current balance is displayed on the Dashboard.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                How can I view my spending reports?
              </Accordion.Header>
              <Accordion.Body>
                Go to the Dashboard to see charts showing your income and
                expenses.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                Can I edit or delete a transaction?
              </Accordion.Header>
              <Accordion.Body>
                Yes, go to the Transactions Page, find the transaction, and use
                the "Edit" or "Delete" option.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Is my data secure?</Accordion.Header>
              <Accordion.Body>
                Yes, your financial data is private and securely stored.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
