import React, { useEffect } from "react";
import { Button, Col, Image, ListGroup, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart, removeCartItem, updateCartItem } from "../../actions/cartActions";
import Message from "../Message";

const CartPage = ({ match, location, history }) => {
  const product_id = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (product_id) {
      dispatch(addItemToCart(product_id, qty));
    }
  }, [dispatch, product_id, qty]);

  const removeItemFromCart = (id) => {
    dispatch(removeCartItem(id))
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <Row>
        <Col>
          <h3 className="py-3">SHOPPING CART</h3>
        </Col>
      </Row>
      <Row>
        {cartItems.length === 0 ? (
          <Col md={12}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Message variant="info">
                  No item exists in your shopping cart.{" "}
                  <Link to="/">Continue shopping</Link>
                </Message>
              </Col>
            </Row>
          </Col>
        ) : (
          <>
            <Col md={8}>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product_id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.product_id}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>₹{item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          size="sm"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateCartItem(
                                item.product_id,
                                Number(e.target.value)
                              )
                            )
                          }
                          style={{ width: "100px" }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2} className="text-right">
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => removeItemFromCart(item.product_id)}
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    SUBTOTAL (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    ITEMS
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>
                    ₹
                    {cartItems.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ).toFixed(2)}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="button" className="btn-block" variant="success" onClick={checkoutHandler}>
                    Proceed To Checkout
                  </Button>
                  <Link to="/" className="btn btn-block btn-warning">
                    Continue Shopping
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default CartPage;
