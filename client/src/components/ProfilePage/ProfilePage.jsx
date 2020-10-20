import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, updateUserProfile } from "../../actions/userActions";
import Loader from "../Loader";
import Message from "../Message";

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/signin");
    } else {
      if (!user.name) {
        dispatch(getUserDetail("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, userInfo, history]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValidated(true);
      setConfirmPassword("");
      setMessage("Matching error! Please check you password.");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setSuccess(true);
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h3 className="my-3">MY ACCOUNT</h3>
        {success && <Message variant="success">Profile Updated!</Message>}
        <Form onSubmit={formSubmitHandler} noValidate validated={validated}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {message && (
              <Form.Control.Feedback type="invalid">
                {message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
      </Col>
      <Col md={8}>
        <h3 className="my-3">MY ORDERS</h3>
      </Col>
    </Row>
  );
};

export default ProfilePage;
