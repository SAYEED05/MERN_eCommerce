import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

import { listProductByCategory } from "../actions/productActions";

/* /api/products/category/${cat} */

const HomeScreen = ({ match }) => {
  const category = match.params.category || "";

  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productCategory;

  useEffect(() => {
    dispatch(listProductByCategory(category));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Meta />
      <h1>{`Category : ${category}`}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products ? (
            <>
              <Link to="/" className="btn btn-light">
                Go Back
              </Link>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <h2>No products Found</h2>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
