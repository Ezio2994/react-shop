import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import disableScroll from "disable-scroll";
import Headroom from "react-headroom";
import useSize from "../../hooks/useSize";
import { Link, navigate } from "@reach/router";

import logo from "../../assets/logo.svg";
import NavBarMenu from "../NavBarMenu/NavBarMenu";

const NavBar = (props) => {
  const { cartOn, setCartOn, headroomOff, hideCart } = props;
  const cartContext = useContext(CartContext);
  const { userCart } = cartContext;
  const userContext = useContext(UserContext);
  const { user, signIn, signOut } = userContext;
  const [menuOn, setMenuOn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [location, setLocation] = useState(window.location.pathname);
  const { width } = useSize();

  const allQuantity = userCart.map((product) => product.quantityToOrder);
  const cartQuantity = allQuantity.length
    ? allQuantity.reduce((a, b) => a + b)
    : 0;

  const userTotalCart = userCart.map((cart) => {
    const total = cart.price * cart.quantityToOrder;
    return total;
  });
  const totalCartPrice = userTotalCart.reduce((a, b) => a + b, 0);

  const nav = (
    <nav style={cartOn ? { pointerEvents: "none" } : null}>
      <img src={logo} alt="" />
      <div
        className={styles.navBarCentre}
        style={
          width > 768
            ? user
              ? null
              : { display: "block" }
            : { display: "none" }
        }
      >
        <Link to="/">About</Link>
        <Link to="/products">Shop</Link>
        <Link style={!user ? { display: "none" } : null} to="/favourites">
          Favourites
        </Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className={styles.navBarRightSide}>
        <div
          style={hideCart ? { display: "none" } : null}
          className={styles.cartAndTotal}
        >
          <button
            onClick={() => {
              setCartOn(true);
              disableScroll.on();
            }}
          >
            <span>{cartQuantity}</span>
            <FontAwesomeIcon icon="shopping-basket" />
          </button>
          <p className={styles.cartTotal}>£{totalCartPrice}</p>
        </div>
        <button
          style={width < 768 ? { display: "none" } : null}
          onClick={() => (user ? navigate("/settings") : signIn())}
        >
          <FontAwesomeIcon icon="user-circle" />{" "}
          {user ? "See Profile" : "SignIn"}
        </button>
        <FontAwesomeIcon
          style={width >= 768 ? { display: "none" } : null}
          onClick={() => {
            setMenuOn(!menuOn);
            setClicked(true);
            disableScroll.on();
          }}
          icon="bars"
        />
      </div>
      <NavBarMenu
        menuOn={menuOn}
        setMenuOn={setMenuOn}
        clicked={clicked}
        setClicked={setClicked}
        user={user}
        signIn={signIn}
        signOut={signOut}
      />
    </nav>
  );

  return (
    <>
      {menuOn || headroomOff ? (
        nav
      ) : (
        <Headroom
          style={{
            zIndex: 10,
          }}
        >
          {nav}
        </Headroom>
      )}
    </>
  );
};

export default NavBar;
