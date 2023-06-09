import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoginStatus } from "../store/AuthSlice";
import { toast } from "react-toastify";



const MyNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isLogin = useSelector(state=>state.auth.isLogin)

  const onLogout = async () => {
    localStorage.removeItem("loginId");
    dispatch(setLoginStatus(false));
    localStorage.removeItem("userName");
    toast.success('LogOut Successfull')
    navigate("/sign-in");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Link to="/" className="text-decoration-none">
        <Navbar.Brand className="ms-5 ">Mail Box</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="me-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/sent-mails">
            Sent Mails
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
        </Nav>
        <Nav>
          <div className="ml-auto">
            {isLogin ? (
              <div className="d-flex gap-4">
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                
                <Button variant="outline-primary" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/sign-up">
                  <Button variant="primary" className="me-4">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/sign-in">
                  <Button variant="primary" className="me-4">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
