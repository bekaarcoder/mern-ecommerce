import React, { useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserLists } from "../../actions/userActions";
import Loader from "../Loader";
import Message from "../Message";

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserLists());
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h3 className="my-4">USER LISTS</h3>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>NAME</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id.toUpperCase()}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>
                      {user.isAdmin ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/user/${user._id}/edit`}>
                        <Button variant="warning" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className="btn-sm ml-2">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserListPage;
