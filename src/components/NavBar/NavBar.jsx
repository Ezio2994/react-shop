import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../data/fa-library";
import { UserContext } from "../../context/userContext";
import { FilterContext } from "../../context/filterContext";

import { Link } from "@reach/router";

const NavBar = () => {
  const filterContext = useContext(FilterContext);
  const { handleCourse, handleCategory, reset } = filterContext;

  const userContext = useContext(UserContext);
  const { signIn, signOut, user } = userContext;

  const signed = user ? (
    <li onClick={signOut}><FontAwesomeIcon icon={['fas', 'sign-out-alt']}></FontAwesomeIcon></li>
  ) : (
      <li onClick={signIn}><FontAwesomeIcon icon={['fas', 'sign-in-alt']}></FontAwesomeIcon></li>
    )

  const favourites = user ? (
    <Link to='/favourites'>
      <li><button className={styles.mainButton}><FontAwesomeIcon icon={['fas', 'heart']}></FontAwesomeIcon></button></li>
    </Link>
  ) : (
      null
    )

  return (
    <>
      <nav>
        <div>
          <div className={styles.dropdown}>
            <button className={styles.mainButton}><FontAwesomeIcon icon={['fas', 'filter']}></FontAwesomeIcon></button>
            <div className={styles.dropdownContent}>
              <article onChange={handleCategory}>
                <p>Vegeterian <input type="radio" name="category" value="vegeterian" /></p>
                <p>Vegan <input type="radio" name="category" value="vegan" /></p>
              </article>
              <article onChange={handleCourse}>
                <p>Starters <input type="radio" name="course" value="starter" /></p>
                <p>Mains <input type="radio" name="course" value="main" /></p>
                <p>Desserts <input type="radio" name="course" value="dessert" /></p>
              </article>
              <button onClick={() => {
                reset()
                document.querySelectorAll('input[type=radio]').forEach(el => el.checked = false);
              }}> No Filters</button>
            </div>
          </div>
          <Link to='/products'>
            <button className={styles.mainButton}><FontAwesomeIcon icon={['fas', 'home']}></FontAwesomeIcon></button>
          </Link>
        </div>
        <Link to="/">
          <h1> The Sicilian Shop</h1>
        </Link>
        <ul>
          {favourites}
          <Link to="/cart">
            <li><button className={styles.mainButton}><FontAwesomeIcon icon={['fas', 'shopping-basket']}></FontAwesomeIcon></button></li>
          </Link>
          <button className={styles.mainButton}>{signed}</button>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
