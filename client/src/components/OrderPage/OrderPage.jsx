import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOrder,
  payOrder,
  resetOrderState,
} from "../../actions/orderActions";
import Message from "../Message";
import Loader from "../Loader";
import { resetCartItems } from "../../actions/cartActions";

const OrderPage = ({ match }) => {
  const [skdReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetail;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch(resetOrderState());
      dispatch(resetCartItems());
      dispatch(getOrder(orderId));
    } else if (!order.isPaid) {
      console.log("order not paid");
      if (!window.paypal) {
        addPaypalScript();
        console.log("adding script");
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <div className="my-3">
      {loading ? (
        <Loader />
      ) : error ? (
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Message variant="danger">{error}</Message>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>ORDER ID</h4>
                <p>{order._id.toUpperCase()}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>SHIPPING ADDRESS</h4>
                <strong>Name: </strong>
                {order.user.name}
                <br />
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  - {order.shippingAddress.pin}, {order.shippingAddress.state},{" "}
                  {order.shippingAddress.country}
                </p>
                <p>
                  <strong>Order Status: </strong>
                  {order.isDelivered ? (
                    <span className="text-success">Delivered</span>
                  ) : (
                    <span className="text-danger">Not Delivered</span>
                  )}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>PAYMENT METHOD</h4>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Payment Status: </strong>{" "}
                  {order.isPaid ? (
                    <span className="text-success">Paid</span>
                  ) : (
                    <span className="text-danger">Not Paid</span>
                  )}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>ORDER ITEMS</h4>
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item.product_id}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} fluid alt={item.name} />
                        </Col>
                        <Col md={7}>
                          <Link to={`/product/${item.product_id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} X ₹{item.price} = ₹
                          {(item.price * item.quantity).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>ORDER SUMMARY</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Charges</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!skdReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderPage;
