import React, { useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersForAdmin } from "../../actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.adminOrderList);
  const { orders, error, loading } = orderList;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrdersForAdmin());
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Row>
      <Col>
        <h3 className="my-3">ORDERS</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped hover>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.toUpperCase()}</td>
                  <td>{order.user.name.toUpperCase()}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-times text-danger"></i>
                    )}
                  </td>
                  <td>
                    {!order.isDelivered ? (
                      <i className="fas fa-times text-danger"></i>
                    ) : (
                      order.deliveredAt.substring(0, 10)
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="primary" className="btn-sm">
                        View Order
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default OrderListPage;
