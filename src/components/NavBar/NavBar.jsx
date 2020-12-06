import React from "react";
import styles from "./NavBar.module.scss";

import { Link } from "@reach/router"

const NavBar = (props) => {
  const { signIn, signOut, user } = props

  const signed = user ? (
    <li onClick={signOut}>LogOut</li>
  ) : (
    <li onClick={signIn}>Login</li>
  )

  const favourites = user ? (
    <Link to='favourites'>
      <li>Favourites</li>
    </Link>
  ) : (
    null
  )

  return (
    <>
      <nav>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          {favourites}
          <li>Cart</li>
          {signed}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
