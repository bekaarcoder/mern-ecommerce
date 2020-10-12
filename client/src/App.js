import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CartPage from "./components/CartPage/CartPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductDetail} exact />
          <Route path="/cart/:id?" component={CartPage} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
