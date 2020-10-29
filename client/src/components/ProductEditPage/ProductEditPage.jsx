import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import { Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { fetchProductDetails, editProduct } from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/types";

const ProductEditPage = ({ history, match }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingProduct,
    product,
    error: errorLoadingProduct,
  } = productDetails;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const updateProduct = useSelector((state) => state.updateProduct);
  const { loading, error, success } = updateProduct;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (success) {
        history.push("/admin/products");
        dispatch({ type: PRODUCT_UPDATE_RESET });
      } else {
        if (!product.name || product._id !== productId) {
          dispatch(fetchProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setImage(product.image);
        }
      }
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, userInfo, product, success, productId]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-sm btn-dark my-3">
        Go Back
      </Link>
      {loadingProduct ? (
        <Loader />
      ) : errorLoadingProduct ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h3 className="my-3">EDIT PRODUCT</h3>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={formSubmitHandler}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Upload image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product stock count"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditPage;
