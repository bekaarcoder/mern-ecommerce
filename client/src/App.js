import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CartPage from "./components/CartPage/CartPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ShippingPage from "./components/ShippingPage/ShippingPage";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import PlaceOrderPage from "./components/PlaceOrderPage/PlaceOrderPage";
import OrderPage from "./components/OrderPage/OrderPage";
import UserListPage from "./components/UserListPage/UserListPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductDetail} exact />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/admin/users" component={UserListPage} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
