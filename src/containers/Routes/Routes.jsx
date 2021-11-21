import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import HomePage from "../../components/HomePage";
import DashBoard from "../DashBoard";
import Favourites from "../Favourites";
import Settings from "../Settings";
import PrivateRoute from "../PrivateRoute";

const Routes = () => {
  const [cartOn, setCartOn] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <HomePage cartOn={cartOn} setCartOn={setCartOn} path="/" />
      <DashBoard
        cartOn={cartOn}
        setCartOn={setCartOn}
        width={width}
        path="products"
      />
      <PrivateRoute path="/">
        <Settings path="settings" />
        <Favourites
          cartOn={cartOn}
          setCartOn={setCartOn}
          width={width}
          path="favourites"
        />
      </PrivateRoute>
    </Router>
  );
};

export default Routes;
