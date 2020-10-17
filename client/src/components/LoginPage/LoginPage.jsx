import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { login } from "../../actions/userActions";
import Loader from "../Loader";
import Message from "../Message";

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h3 className="my-3">SIGN IN</h3>
      <Form onSubmit={formSubmitHandler}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="my-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
    </FormContainer>
  );
};

export default LoginPage;
