import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  cashReceived,
  orderPacked,
  orderDispatched,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CASH_RECEIVED_RESET,
  ORDER_PACKED_RESET,
  ORDER_DISPATCHED_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderPack = useSelector((state) => state.orderPack);
  const { success: successPack, loading: loadingPack } = orderPack;

  const orderDispatch = useSelector((state) => state.orderDispatch);
  const { success: successDispatch, loading: loadingDispatch } = orderDispatch;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const cashReceive = useSelector((state) => state.cashReceive);
  const {
    success: successCashReceive,
    loading: loadingCashReceive,
  } = cashReceive;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    //REDIRECTS TO LOGIN PAGE WHEN TRYING TO ACCESS ORDER PAGE WITHOUT LOGGED IN
    if (!userInfo) {
      history.push("/login");
    }

    //DYNAMICALLY ADD PAYPAL SCRIPT TO BODY
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (
      !order ||
      successPay ||
      successPack ||
      successDeliver ||
      successDispatch ||
      successCashReceive ||
      order._id !== orderId
    ) {
      //DISPATCHING RESETS
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_CASH_RECEIVED_RESET });
      dispatch({ type: ORDER_PACKED_RESET });
      dispatch({ type: ORDER_DISPATCHED_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        //SHOW PAYPAL WINDOW
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    //DEPENDENCIES FOR USE_EFFECT
    order,
    successPay,
    successDeliver,
    successCashReceive,
    successPack,
    successDispatch,
    orderId,
    history,
    userInfo,
    dispatch,
  ]);

  //PAYPAL SUCCESS HANDLER
  const successPaymentHandler = (paymentResult) => {
    //console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  //MARK AS DELIVERED HANDLER
  const deliverHandler = () => {
    if (window.confirm("Press ok to mark this order as delivered")) {
      dispatch(deliverOrder(order));
    }
  };

  //MARK AS PAID HANDLER
  const cashReceivedHandler = () => {
    if (window.confirm("Press ok to mark this cash received")) {
      dispatch(cashReceived(order));
    }
  };

  //MARK AS PACKED HANDLER
  const orderPackedHandler = () => {
    if (window.confirm("Press ok to mark this packed")) {
      dispatch(orderPacked(order));
    }
  };

  //MARK AS DISPATCHED
  const orderDispatchedHandler = () => {
    if (window.confirm("Press ok to mark this dispatched")) {
      dispatch(orderDispatched(order));
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 id="order-order-id">Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>

              <p>
                {" "}
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                <br />
                {order.shippingAddress.address},<br />
                {order.shippingAddress.city},<br />
                {order.shippingAddress.postalCode},<br />
                {order.shippingAddress.country}
              </p>

              {order.isPacked ? (
                <Message variant="success">Packed On {order.packedAt}</Message>
              ) : (
                <Message variant="danger">Order is Not Packed Yet</Message>
              )}

              {order.isDispatched ? (
                <Message variant="success">
                  Dispatched on {order.dispatchedAt}
                </Message>
              ) : (
                <Message variant="danger">Order is Not Dispatched Yet</Message>
              )}

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Order is Not Delivered Yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          {item.qty} X ${item.price} =${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingCashReceive && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={cashReceivedHandler}
                  >
                    Mark As Paid
                  </Button>
                </ListGroup.Item>
              )}

              {loadingPack && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isPacked &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={orderPackedHandler}
                    >
                      Mark As Packed
                    </Button>
                  </ListGroup.Item>
                )}

              {loadingDispatch && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPacked &&
                !order.isDispatched &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={orderDispatchedHandler}
                    >
                      Mark As Dispatched
                    </Button>
                  </ListGroup.Item>
                )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered &&
                order.isPacked &&
                order.isDispatched && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
