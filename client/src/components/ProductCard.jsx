import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <Card className="p-3 my-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div" className="mt-2">
          ${product.price}
        </Card.Text>
        <Card.Text as="div" className="mt-2">
          <Rating value={product.rating} reviews={product.numReviews} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
