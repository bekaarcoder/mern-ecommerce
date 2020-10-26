import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersForUser } from "../../actions/orderActions";
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

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading: ordersLoading, error: ordersError } = orderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/signin");
    } else {
      if (!user.name) {
        dispatch(getUserDetail("profile"));
        dispatch(getOrdersForUser());
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
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant="danger">{ordersError}</Message>
        ) : (
          <Table striped hover>
            <thead>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>{order._id.toUpperCase()}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  <td>
                    {!order.isDeliverd ? (
                      <i className="fas fa-times text-danger"></i>
                    ) : (
                      order.deliveredAt.substring(0, 10)
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="primary" className="btn-sm">
                        View Order
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
