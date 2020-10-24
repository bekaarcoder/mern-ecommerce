import React, { useState } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps";

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const itemsPrice = Number(
    cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2)
  );

  const shippingPrice = Number(itemsPrice > 500 ? 0 : 100).toFixed(2);

  const tax = Number(0.15 * itemsPrice).toFixed(2);

  const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(tax);

  return (
    <div className="my-3">
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>SHIPPING ADDRESS</h4>
              <p>
                {shippingAddress.address},
                <br />
                {shippingAddress.city} - {shippingAddress.pin},
                <br />
                {shippingAddress.state}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>PAYMENT METHOD</h4>
              <p>Method: {cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>ORDER ITEMS</h4>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
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
                <Col>₹{itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Charges</Col>
                <Col>₹{shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>₹{tax}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>₹{totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" variant="success" className="btn-block">
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
