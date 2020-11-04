import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../ProductCard";
import { listProducts } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";
import Paginate from "../Paginate";

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <ProductCard product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
