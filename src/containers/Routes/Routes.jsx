import React from "react";
import { Router } from "@reach/router";

import DashBoard from "../DashBoard";
import Favourites from "../Favourites";
import Cart from "../Cart";

const Routes = () => {

  return (
    <Router>
      <DashBoard path="/"/>
      <Favourites path="favourites" />
      <Cart path="cart" />
    </Router>
  );
};

export default Routes;
