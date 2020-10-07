import React from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../../products";
import Rating from "../Rating";

const ProductDetail = ({ match }) => {
  const id = match.params.id;
  const product = products.find((p) => p._id === id);
  return (
    <>
      <Link to="/" className="btn btn-secondary btn-sm my-3">
        GO BACK
      </Link>
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
          <Button
            variant="primary"
            size="lg"
            className="mt-3"
            disabled={product.countInStock === 0}
          >
            <i className="fas fa-shopping-cart"></i> ADD TO CART
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
