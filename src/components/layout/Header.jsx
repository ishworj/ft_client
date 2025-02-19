import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { TbLogin } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { useUser } from "../../context/UserContext.jsx";
import { MdContactSupport } from "react-icons/md";
import { useState } from "react";
export const Header = () => {
  const { user, setUser } = useUser();
  const [menu, showMenu] = useState(false);
  function handleOnLogout() {
    localStorage.removeItem("accessJWT");
    setUser({});
    showMenu(false);
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      aria-haspopup
      className="bg-body-dark"
      expanded={menu}
    >
      <Container className=" p-md-3">
        <Navbar.Brand
          href="#home"
          className="d-flex gap-2 align-items-center fs-md-4"
        >
          <img
            className=""
            src="/bank.png"
            height={"60px"}
            alt="logo"
            onClick={handleClick}
          />

          <div onClick={handleClick}>Expense Tracker</div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            menu ? showMenu(false) : showMenu(true);
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-light text-center">
            {user?._id ? (
              <>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link text-light"
                  to="/dashboard"
                >
                  <MdDashboard /> Dashboard
                </Link>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link text-light"
                  to="/transaction"
                >
                  <GrTransaction />
                  Transaction
                </Link>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link text-light"
                  to="/contact"
                >
                  <MdContactSupport />
                  Contact Us
                </Link>
                <div className="d-flex justify-content-center">
                  <Link
                    onClick={handleOnLogout}
                    className="nav-link text-dark bg-warning rounded px-2 "
                    to="/"
                  >
                    <ImExit />
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link text-light"
                  to=""
                >
                  Home
                </Link>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link text-light"
                  to="/contact"
                >
                  Contact Us
                </Link>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link text-light"
                  to="/login"
                >
                  <TbLogin />
                  Login
                </Link>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link text-light rounded bg-primary"
                  to="/signup"
                >
                  <IoCreate />
                  Sign up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
