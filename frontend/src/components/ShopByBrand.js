import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShopByBrand = ({ brands }) => {
  return (
    <div>
      <h1>Shop By brands</h1>
      <Row>
        {brands.map((bran, k) => (
          <Col className="shop-by-category" key={k} sm={12} md={2}>
            <p>
              <Link
                className="btn btn-primary btn-lg"
                to={`/products/brands/${bran}`}
              >
                {bran}
              </Link>
            </p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopByBrand;
