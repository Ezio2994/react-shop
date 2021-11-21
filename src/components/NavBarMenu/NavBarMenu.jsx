import React, { useEffect, useState } from "react";
import styles from "./NavBarMenu.module.scss";

import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import disableScroll from "disable-scroll";

const NavBarMenu = (props) => {
  const { menuOn, setMenuOn, clicked, setClicked, user, signIn, signOut } =
    props;

  const linksNames = {
    Shop: "/products",
    About: "/",
    "Saved Items": "/favourites",
  };

  const isSelected = (name) =>
    window.location.pathname === linksNames[name] ? { color: "#F6AB65" } : null;

  // document
  //   .querySelectorAll("a")
  //   .forEach((a) => a.onclick(() => disableScroll.off()));

  return (
    <section
      style={clicked ? { display: "block" } : { display: "none" }}
      className={`${styles.navBarMenu} ${
        clicked ? (menuOn ? styles.slideInRight : styles.slideOutRight) : null
      }`}
    >
      <FontAwesomeIcon
        onClick={() => {
          setMenuOn(!menuOn);
          setTimeout(() => {
            setClicked(!clicked);
            disableScroll.off();
          }, 500);
        }}
        icon={["far", "times-circle"]}
      />
      <ul>
        <li onClick={() => (!user ? signIn() : null)}>
          {user ? (
            <>
              <img src={user.photoURL} alt="" /> {user.displayName}{" "}
            </>
          ) : (
            <>
              <FontAwesomeIcon icon="user-circle" /> LogIn{" "}
            </>
          )}
        </li>
        {user && (
          <Link onClick={() => disableScroll.off()} to="/settings">
            <li>Settings</li>
          </Link>
        )}
        <Link onClick={() => disableScroll.off()} to="/">
          <li style={isSelected("About")}>About</li>
        </Link>
        <Link onClick={() => disableScroll.off()} to="/products">
          <li style={isSelected("Shop")}>Shop</li>
        </Link>
        {user && (
          <Link onClick={() => disableScroll.off()} to="/favourites">
            <li style={isSelected("Saved Items")}> Saved Items</li>
          </Link>
        )}
        <li style={isSelected("Contact Us")}>Contact Us</li>
        <li style={!user ? { display: "none" } : null} onClick={signOut}>
          LogOut
        </li>
      </ul>
    </section>
  );
};

export default NavBarMenu;
