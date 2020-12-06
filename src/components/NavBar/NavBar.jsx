import React from "react";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>Home</li>
          <li>Favourites</li>
          <li>Cart</li>
          <li>Login</li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
