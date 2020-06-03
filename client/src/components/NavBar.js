import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/auth";
import { withRouter } from "react-router";

const NavBar = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const routes = auth.isAuth ? ["logout"] : ["register", "login"];
  return (
    <Navbar variant="dark" bg="dark" expand="md" style={{ fontWeight: "300" }}>
      <Navbar.Brand>
        <Container>
          <div className="ml-auto" style={{ fontSize: "1.5em" }}>
            <Link to="/" className="nav-link text-white m-3">
              {" "}
              MERNstack
            </Link>
          </div>
        </Container>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-uppercase" style={{ fontSize: "1.5em" }}>
          {routes.map((element, index) => {
            if (element === "logout") {
              return (
                <Link
                  key={index}
                  to="#"
                  onClick={() => {
                    dispatch(logoutUser(props.history));
                  }}
                  className="nav-link text-uppercase text-white m-3"
                >
                  {element}
                </Link>
              );
            } else {
              return (
                <Link
                  key={index}
                  to={"/" + element}
                  className="nav-link text-uppercase text-white m-3"
                >
                  {element}
                </Link>
              );
            }
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);
