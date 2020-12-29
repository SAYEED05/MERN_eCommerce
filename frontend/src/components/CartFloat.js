import React from "react";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
const CartFloat = () => {
  const cart = useSelector((state) => state.cart);
  const cartLength = cart.cartItems.length;
  return (
    <div id="cart-float">
      <LinkContainer to="/cart">
        {cartLength > 0 ? (
          <span className="fa-layers fa-fw mx-2">
            <i className="fas fa-shopping-cart fa-lg"></i>
            <span
              className="fas fa-layers-counter fa-layers-top-left"
              style={{
                background: "tomato",
                fontSize: "1rem",
              }}
            >
              {cartLength}
            </span>
          </span>
        ) : (
          <i className="fas fa-shopping-cart fa-lg"></i>
        )}
      </LinkContainer>
    </div>
  );
};

export default CartFloat;
