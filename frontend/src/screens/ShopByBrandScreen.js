import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

import { listProductByBrand } from "../actions/productActions";

/* /api/products/category/${cat} */

const HomeScreen = ({ match }) => {
  const brand = match.params.brand || "";

  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productCategory;

  useEffect(() => {
    dispatch(listProductByBrand(brand));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Meta />
      <h1>{`Products of ${brand}`}</h1>
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
