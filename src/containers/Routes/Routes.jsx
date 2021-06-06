import React from "react";
import { Router } from "@reach/router";

import HomePage from "../../components/HomePage";
import DashBoard from "../DashBoard";
import Favourites from "../Favourites";
import Cart from "../Cart";
import Settings from "../Settings";
import PrivateRoute from "../PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <HomePage path="/" />
      <DashBoard path="products" />
      <Favourites path="favourites" />
      <Cart path="cart" />
      <PrivateRoute path="/">
        <Settings path="settings" />
      </PrivateRoute>
    </Router>
  );
};

export default Routes;
