import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { UserContext } from "../../context/userContext";
import { FilterContext } from "../../context/filterContext";

import { Link } from "@reach/router";

const NavBar = () => {
  const filterContext = useContext(FilterContext);
  const { handleFilters } = filterContext;


  const userContext = useContext(UserContext);
  const { signIn, signOut, user } = userContext;


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

  const [checked, setChecked] = useState(false)
  console.log(checked);

  return (
    <>
      <nav>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Dropdown</button>
          <div className={styles.dropdownContent}>
            <p>Vegeterian <input type="checkbox" name="vegeterian" id="vegeterian" value={'vegeterian'} onChange={() => setChecked(!checked)} /></p>
            <p>some2</p>
            <p>some3</p>
          </div>
        </div>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          {favourites}
          <Link to="cart">
            <li>Cart</li>
          </Link>
          {signed}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
