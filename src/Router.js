import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./Pages/Orders/Order";
import Landing from "./Pages/Landing/Landing";
import Cart from "./Pages/Cart/Cart";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51OicB5ED8ZyOzabPWD6drDDRQzmd1pJQQ86jZ2kXqRygmvY5mRZw14MHa7s1FEHQlPtHsRVyTrpKF4ftxTjYiaCU00D0A6kMH4"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must log in to acces your orders"}
              redirect={"/orders"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg={"You must log in to pay"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>{<Payment />}</Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
