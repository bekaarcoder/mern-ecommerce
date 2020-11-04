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
import UserEditPage from "./components/UserEditPage/UserEditPage";
import ProductsListPage from "./components/ProductsListPage/ProductsListPage";
import ProductCreatePage from "./components/ProductCreatePage/ProductCreatePage";
import ProductEditPage from "./components/ProductEditPage/ProductEditPage";
import OrderListPage from "./components/OrderListPage/OrderListPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/product/:id" component={ProductDetail} exact />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/admin/orders" component={OrderListPage} />
          <Route path="/admin/users" component={UserListPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route
            path="/admin/products/create"
            component={ProductCreatePage}
            exact
          />
          <Route path="/admin/products" component={ProductsListPage} exact />
          <Route
            path="/admin/products/page/:pageNumber"
            component={ProductsListPage}
            exact
          />
          <Route path="/admin/products/:id/edit" component={ProductEditPage} />
          <Route path="/search/:keyword" component={HomePage} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
          />
          <Route path="/page/:pageNumber" component={HomePage} />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
