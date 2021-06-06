import React, { useContext, useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sicilyLogo from "../../assets/sicilyLogo.jpg";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";

import { Link } from "@reach/router";

const NavBar = () => {
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
      <Link
        style={user ? { display: "block" } : { display: "none" }}
        to="/settings"
      >
        <FontAwesomeIcon icon="user-cog" />
      </Link>
      <Link to="/">
        <h1>The Sicilian Shop</h1>
      </Link>
      {location === "/products" ? (
        <Link onClick={() => setLocation("/favourites")} to="/favourites">
          <FontAwesomeIcon icon="heart" />
        </Link>
      ) : (
        <Link onClick={() => setLocation("/products")} to="/products">
          <FontAwesomeIcon icon="home" />
        </Link>
      )}

      <Link to="/cart">
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={cartQuantity}
          readOnly
        />
        <FontAwesomeIcon icon="shopping-basket" />
      </Link>
    </nav>
  );
};

export default NavBar;
