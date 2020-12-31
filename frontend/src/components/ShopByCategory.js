import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShopByCategory = ({ keys }) => {
  return (
    <div>
      <h1>Shop By category</h1>
      <Row>
        {keys.map((cat, k) => (
          <Col className="shop-by-category" key={k} sm={12} md={2}>
            <p>
              <Link
                className="btn btn-primary btn-lg"
                to={`/products/category/${cat}`}
              >
                {cat}
              </Link>
            </p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopByCategory;
