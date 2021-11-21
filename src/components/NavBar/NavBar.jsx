import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import disableScroll from "disable-scroll";
import Headroom from "react-headroom";
import useSize from "../../hooks/useSize";

import logo from "../../assets/logo.svg";
import NavBarMenu from "../NavBarMenu/NavBarMenu";

const NavBar = (props) => {
  const { cartOn, setCartOn, headroomOff } = props;
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
      <div>
        <div
          style={location === "/settings" ? { display: "none" } : null}
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
