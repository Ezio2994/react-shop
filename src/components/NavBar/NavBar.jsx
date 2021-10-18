import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import disableScroll from "disable-scroll";

import { Link, navigate } from "@reach/router";

const NavBar = (props) => {
  const { cartOn, setCartOn } = props;
  const cartContext = useContext(CartContext);
  const { userCart } = cartContext;
  const userContext = useContext(UserContext);
  const { user, signIn } = userContext;

  const [location, setLocation] = useState(window.location.pathname);

  const allQuantity = userCart.map((product) => product.quantityToOrder);
  const cartQuantity = allQuantity.length
    ? allQuantity.reduce((a, b) => a + b)
    : 0;

  const userTotalCart = userCart.map((cart) => {
    const total = cart.price * cart.quantityToOrder;
    return total;
  });
  const totalCartPrice = userTotalCart.reduce((a, b) => a + b, 0);

  return (
    <nav style={cartOn ? { pointerEvents: "none" } : null}>
      <Link to="/">
        <h1>Sicilian Shop</h1>
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
              if (location === "/products" || location === "/favourites") {
                setCartOn(true);
                disableScroll.on();
              } else {
                navigate("/products");
              }
            }}
          >
            <span>{cartQuantity}</span>
            <FontAwesomeIcon icon="shopping-basket" />
          </button>
          <p className={styles.cartTotal}>£{totalCartPrice}</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
