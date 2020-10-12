import React, { useState, useEffect } from "react";
import { Col, Row, Image, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";

const ProductDetail = ({ history, match }) => {
  const id = match.params.id;
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${quantity}`);
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
      )}
    </>
  );
};

export default ProductDetail;
