import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";


const Footer = () => {
  const [email,setEmail]=useState("")
  const handleOnChange =(e)=>{
    setEmail(e.target.value)
  }

  const handleOnSuscribe = (e)=>{
    e.preventDefault();
    toast.success("Thnak you for suscribing us 🎉✨")
    setEmail("");

  }
  return (
    <Container fluid className="bg-dark p-5 ">
      <Row className="text-center mb-4">
        <Col md={6}>
          <div>
            <h5 className="text-white ">SUBSCRIBE OUR NEWSLETTERS NOW</h5>
            <form
              action=""
              className="d-flex justify-content-center" onSubmit={handleOnSuscribe}
            >
              <input
                type="email"
                name="emailId"
                placeholder="Enter Your Email Id"
                className="p-2 mx-2 rounded"
                value={email}
                onChange={handleOnChange}
                required
              />
              <button className="btn btn-default bg-primary " >
                Subscribe<i className="fa fa-envelope"></i>
              </button>
            </form>
          </div>
        </Col>
        <Col className="fs-4">
          <div>Follow us</div>
          <div>
            <a
              className=""
              href="https://www.linkedin.com/in/ishwor-karki-4b3973272/"
              target="_blank"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.linkedin.com/in/ishwor-karki-4b3973272/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <hr />
        <Col>
          Copyright &copy; Expense Tracker All reserved 2025. Made by{" "}
          <a
            href="https://www.linkedin.com/in/ishwor-karki-4b3973272/"
            target="_blank"
          >
            Ishwor Karki
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
