import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import Dashboard from "./Dashboard";
const Home = () => {
  const { user } = useUser();
  return user?._id ? (
    <Dashboard />
  ) : (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded mb-5">
        <Col md={6} className="text-white">
          <div className="d-flex justify-content-center align-items-center h-75">
            <div>
              <h1 className="text-gradient">Why Choose Finance Tracker?</h1>
              <p>
                The Finance Tracker App is designed to help you manage your
                money effectively. Whether you're saving for the future,
                tracking your expenses, or just staying organized, our app gives
                you all the tools you need to take control of your finances.
              </p>
            </div>
          </div>
          <Link to="/signup">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </Col>
        <Col md={6}>
          <img
            src="/increase (1).png"
            alt="Finance Tracker"
            className="img-fluid"
          />
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="bg-success text-black p-5 rounded mb-5">
        <Col md={12} className="text-center mb-4">
          <h2>Features of Finance Tracker</h2>
          <p>
            Discover the powerful features that help you stay on top of your
            finances.
          </p>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Track Your Income & Expenses</Card.Title>
              <Card.Text>
                Easily track your income and expenses in various categories.
                Stay organized and make informed decisions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Financial Insights with Graphs</Card.Title>
              <Card.Text>
                Get visual insights of your spending habits with pie charts and
                line graphs. Make smarter financial choices.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Secure & Private</Card.Title>
              <Card.Text>
                Your data is secured with the latest encryption methods. We
                prioritize your privacy and safety.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <div className="testimonials-section text-center ">
          <h2 className="pb-5">What Our Users Are Saying</h2>
          <Carousel>
            <Carousel.Item>
              <div className="testimonial-card pb-5">
                <div>
                  <img
                    src="./girl.jpg"
                    alt=""
                    className="rounded-circle"
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p>
                  "This app has helped me track my expenses and save money every
                  month!"
                </p>
                <h4>Sarah Lee</h4>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="testimonial-card pb-5">
                <div>
                  <img
                    src="./manphoto.jpg"
                    alt=""
                    className="rounded-circle"
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p>
                  "The reports feature is amazing! I can now easily see where my
                  money is going."
                </p>
                <h4>john doe</h4>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </Row>
    </Container>
  );
};

export default Home;
