import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import ShopByCategory from "../components/ShopByCategory";
import ShopByBrand from "../components/ShopByBrand";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  //GET CATEGORIES
  var categ = products
    .map((product) => {
      return { count: 1, product: product.category };
    })
    .reduce((a, b) => {
      a[b.product] = (a[b.product] || 0) + b.count;
      return a;
    }, {});
  var keys = Object.keys(categ); /* .map((k) => console.log(k)) */

  //GET BRAND
  var bran = products
    .map((product) => {
      return { count: 1, product: product.brand };
    })
    .reduce((a, b) => {
      a[b.product] = (a[b.product] || 0) + b.count;
      return a;
    }, {});
  var brands = Object.keys(bran); /* .map((k) => console.log(k)) */

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <h1>Top Rated Products</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>latest products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <ShopByCategory keys={keys} />
          <ShopByBrand brands={brands} />
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
