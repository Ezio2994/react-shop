import React from "react";
import { Router } from "@reach/router";

import HomePage from "../../components/HomePage"
import DashBoard from "../DashBoard";
import Favourites from "../Favourites";
import Cart from "../Cart";
import Settings from "../Settings"

const Routes = () => {

  return (
    <Router>
      <HomePage path='/' />
      <DashBoard path="products" />
      <Favourites path="favourites" />
      <Cart path="cart" />
      <Settings path="settings" />
    </Router>
  );
};

export default Routes;
