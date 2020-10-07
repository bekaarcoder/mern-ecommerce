import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>MERNSHOP</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> CART
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signin">
              <Nav.Link href="/signin">
                <i className="fas fa-user"></i> SIGN IN
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
