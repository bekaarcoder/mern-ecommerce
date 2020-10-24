import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../CheckoutSteps";
import FormContainer from "../FormContainer";

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);
  const [pin, setPin] = useState(shippingAddress.pin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addShippingAddress({ address, city, state, country, pin }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h3 className="my-3">SHIPPING</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pincode"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
