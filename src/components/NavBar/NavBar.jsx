import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sicilyLogo from "../../assets/sicilyLogo.jpg";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";

import { Link } from "@reach/router";

const NavBar = (props) => {
  const { setCartOn } = props;
  const cartContext = useContext(CartContext);
  const { userCart } = cartContext;
  const userContext = useContext(UserContext);
  const { user } = userContext;

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
        {location === "/products" ? (
          <Link onClick={() => setLocation("/favourites")} to="/favourites">
            <FontAwesomeIcon icon="heart" />
          </Link>
        ) : (
          <Link onClick={() => setLocation("/products")} to="/products">
            <FontAwesomeIcon icon="home" />
          </Link>
        )}
        <button
          style={location === "/settings" ? { display: "none" } : null}
          onClick={() => setCartOn(true)}
        >
          <p>{cartQuantity}</p>
          <FontAwesomeIcon icon="shopping-basket" />
        </button>
        <Link
          onClick={() => setLocation("/settings")}
          style={user ? { display: "block" } : { display: "none" }}
          to="/settings"
        >
          <FontAwesomeIcon icon="user-cog" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
