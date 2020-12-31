import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

import { listProducts } from "../actions/productActions";

/* /api/products/category/${cat} */

const HomeScreen = ({ match }) => {
  const category = match.params.category || "";

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(category));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products && (
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
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
