import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {  Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { TbLogin } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { useUser } from "../../context/UserContext.jsx";
import { useState } from "react";
export const Header = () => {
  const { user, setUser } = useUser();
  const [menu, showMenu] = useState(false);
  function handleOnLogout() {
    localStorage.removeItem("accessJWT");
    setUser({});
    showMenu(false)
  }
  return (
    <Navbar expand="lg" variant="dark" className="bg-body-dark" expanded={menu}>
      <Container>
        <Navbar.Brand href="#home">FT</Navbar.Brand>
        {user?.name && <div>Welcome {user?.name}</div>}

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            menu ? showMenu(false) : showMenu(true);
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link"
                  to="/dashboard"
                >
                  <MdDashboard />
                  Dashboard
                </Link>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link"
                  to="/transaction"
                >
                  <GrTransaction />
                  Transaction
                </Link>
                <Link onClick={handleOnLogout} className="nav-link" to="/">
                  <ImExit />
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link"
                  to="/signup"
                >
                  <IoCreate />
                  Sign up
                </Link>

                <Link
                  onClick={() => {
                    showMenu(false);
                  }}
                  className="nav-link"
                  to="/"
                >
                  <TbLogin />
                  Login
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
