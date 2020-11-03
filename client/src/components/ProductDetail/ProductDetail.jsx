import React, { useState, useEffect } from "react";
import { Col, Row, Image, Button, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  fetchProductDetails,
} from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/types";

const ProductDetail = ({ history, match }) => {
  const id = match.params.id;
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    error: errorReview,
    loading: loadingReview,
    success,
  } = productCreateReview;

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(fetchProductDetails(id));
  }, [dispatch, id, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${quantity}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating: Number(rating),
        comments: comment,
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-secondary btn-sm my-3">
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <h3>{product.name}</h3>
              <Rating value={product.rating} />{" "}
              <span className="text-muted">{product.numReviews} reviews</span>
              <h2 className="my-2">₹{product.price}</h2>
              <p>{product.description}</p>
              {product.countInStock === 0 ? (
                <h4 className="text-danger">Out of Stock</h4>
              ) : (
                <h4 className="text-success">In Stock</h4>
              )}
              {product.countInStock > 0 && (
                <Form.Group>
                  <Form.Label>Select Quantity</Form.Label>
                  <Form.Control
                    as="select"
                    size="sm"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ width: "100px" }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              <Button
                variant="primary"
                size="lg"
                className="mt-3"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                <i className="fas fa-shopping-cart"></i> ADD TO CART
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4 className="my-4">REVIEWS</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>Write a Customer Review</h5>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {loadingReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group>
                        <Form.Label>Select Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">Poor</option>
                          <option value="2">Average</option>
                          <option value="3">Good</option>
                          <option value="4">Very Good</option>
                          <option value="5">Great</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your review"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="warning">
                      Please <Link to="/signin">sign in</Link> to add a review
                      for the product.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
              {product.reviews && product.reviews.length === 0 ? (
                <Message variant="info">
                  No one has reviewed this product.
                </Message>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5>Other Customers Reviews</h5>
                  </ListGroup.Item>
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong className="mr-2">{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comments}</p>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetail;
