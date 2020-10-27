import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import { Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { getUserDetail } from "../../actions/userActions";

const UserEditPage = ({ history, match }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { user, loading, error } = userDetail;

  useEffect(() => {
    if (!user.name || userId !== user._id) {
      dispatch(getUserDetail(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-sm btn-dark my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h3 className="my-3">EDIT USER</h3>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                value={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update User
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UserEditPage;
