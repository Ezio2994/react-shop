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
  const [scrollDir, setScrollDir] = useState("down");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <HomePage path="/" />
      <DashBoard
        cartOn={cartOn}
        setCartOn={setCartOn}
        width={width}
        scrollDir={scrollDir}
        path="products"
      />
      <PrivateRoute path="/">
        <Settings path="settings" />
        <Favourites
          cartOn={cartOn}
          setCartOn={setCartOn}
          width={width}
          scrollDir={scrollDir}
          path="favourites"
        />
      </PrivateRoute>
    </Router>
  );
};

export default Routes;
