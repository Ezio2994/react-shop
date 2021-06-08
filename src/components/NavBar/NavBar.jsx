import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sicilyLogo from "../../assets/sicilyLogo.jpg";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";

import { Link, navigate } from "@reach/router";

const NavBar = (props) => {
  const { setCartOn } = props;
  const cartContext = useContext(CartContext);
  const { userCart, cartTotal } = cartContext;
  const userContext = useContext(UserContext);
  const { user, signIn } = userContext;

  const [location, setLocation] = useState(window.location.pathname);

  const allQuantity = userCart.map((product) => product.quantityToOrder);
  const cartQuantity = allQuantity.length
    ? allQuantity.reduce((a, b) => a + b)
    : 0;

  return (
    <nav>
      <Link to="/">
        <h1>The Sicilian Shop</h1>
      </Link>
      <div>
        {!user ? (
          <button onClick={() => signIn()}>
            <FontAwesomeIcon icon="sign-in-alt" />{" "}
          </button>
        ) : (
          <Link onClick={() => setLocation("/settings")} to="/settings">
            <FontAwesomeIcon icon="user-cog" />
          </Link>
        )}
        {location === "/products" ? (
          <Link
            style={user ? { display: "block" } : { display: "none" }}
            onClick={() => setLocation("/favourites")}
            to="/favourites"
          >
            <FontAwesomeIcon icon="heart" />
          </Link>
        ) : (
          <Link onClick={() => setLocation("/products")} to="/products">
            <FontAwesomeIcon icon="home" />
          </Link>
        )}
        <div
          style={location === "/settings" ? { display: "none" } : null}
          className={styles.cartAndTotal}
        >
          <button
            onClick={() => {
              if (location === "/products") {
                setCartOn(true);
              } else {
                navigate("/products");
              }
            }}
          >
            <span>{cartQuantity}</span>
            <FontAwesomeIcon icon="shopping-basket" />
          </button>
          <p className={styles.cartTotal}>
            £{cartTotal.current ? cartTotal.current.value : "0.00"}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
