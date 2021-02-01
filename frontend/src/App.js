import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceorderScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/product/:id" exact component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" exact component={HomeScreen} />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
