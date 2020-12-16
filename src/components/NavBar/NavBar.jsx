import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../data/fa-library";
import { UserContext } from "../../context/userContext";
import { FilterContext } from "../../context/filterContext";

import { Link } from "@reach/router";

const NavBar = () => {
  const filterContext = useContext(FilterContext);
  const { Vchecked, setVChecked, vgChecked, setVgChecked, startersChecked, setStartersChecked, dessertsChecked, setDessertsChecked, mainsChecked, setMainsChecked } = filterContext;


  const userContext = useContext(UserContext);
  const { signIn, signOut, user } = userContext;


  const signed = user ? (
    <li onClick={signOut}><FontAwesomeIcon icon={['fas', 'sign-out-alt']}></FontAwesomeIcon></li>
  ) : (
      <li onClick={signIn}><FontAwesomeIcon icon={['fas', 'sign-in-alt']}></FontAwesomeIcon></li>
    )

  const favourites = user ? (
    <Link to='/favourites'>
      <li><FontAwesomeIcon icon={['fas', 'heart']}></FontAwesomeIcon></li>
    </Link>
  ) : (
      null
    )

  return (
    <>
      <nav>
        <div>
          <div className={styles.dropdown}>
            <button> <FontAwesomeIcon icon={['fas', 'filter']}></FontAwesomeIcon> </button>
            <div className={styles.dropdownContent}>
              <p>Vegeterian <input type="checkbox" name="vegeterian" id="vegeterian" onChange={() => setVChecked(!Vchecked)} /></p>
              <p>Vegan <input type="checkbox" name="vegan" id="vegan" onChange={() => setVgChecked(!vgChecked)} /></p>
              <p>Starters <input type="checkbox" name="starters" id="starters" onChange={() => setStartersChecked(!startersChecked)} /></p>
              <p>Mains <input type="checkbox" name="mains" id="mains" onChange={() => setMainsChecked(!mainsChecked)} /></p>
              <p>Desserts <input type="checkbox" name="desserts" id="desserts" onChange={() => setDessertsChecked(!dessertsChecked)} /></p>
            </div>
          </div>
          <Link to='/products'>
            <button><FontAwesomeIcon icon={['fas', 'home']}></FontAwesomeIcon></button>
          </Link>
        </div>
        <Link to="/">
          <h1>The Sicilian Shop</h1>
        </Link>
        <ul>
          {favourites}
          <Link to="/cart">
            <li><FontAwesomeIcon icon={['fas', 'shopping-basket']}></FontAwesomeIcon></li>
          </Link>
          {signed}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
