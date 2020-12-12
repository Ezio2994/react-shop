import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.scss";
import NotFound from "../NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../data/fa-library";

const ProductCard = (props) => {
  const { id, name, img, availability, price, description } = props.product;

  const {
    user,
    addToFav,
    removeFromFav,
    favComparison,
    addToCart,
    addToGuestCart,
    category,
  } = props;
  const [counter, setCounter] = useState(1);

  const stock =
    availability > 0 ? (
      <h3>In stock: {availability}</h3>
    ) : (
      <h3> Out of stock</h3>
    );
  const stockForCart =
    availability > 0 ? (
      <>
        <button
          onClick={() => {
            if (user) {
              addToCart(props.product, counter);
            } else {
              addToGuestCart(props.product, counter);
            }
          }}
        >
          Add to cart
        </button>
        <button
          onClick={() => {
            if (counter > 1) {
              setCounter(counter - 1);
            }
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            if (counter < availability) {
              setCounter(counter + 1);
            }
          }}
        >
          +
        </button>
        <input
          type="number"
          name="counter"
          id="counter"
          value={counter}
          readOnly
        />
      </>
    ) : (
      <h3> Out of stock</h3>
    );

  const heartIcon = favComparison.includes(id)
    ? ["fas", "heart"]
    : ["far", "heart"];

  const ifUserAddToFav = user ? (
    <span
      onClick={() => {
        if (!favComparison.includes(id)) {
          addToFav(props.product);
        } else {
          removeFromFav(props.product);
        }
      }}
    >
      <FontAwesomeIcon icon={heartIcon} />
    </span>
  ) : (
    <p>LogIn to save this product on your favourites </p>
  );

  const vegeterian = props.product.category === "v" ? <span>V</span> : null;
  const vegan = props.product.category === "vg" ? <span>Vg</span> : null;

  return (
    <article className={styles.productCard}>
      <h2>
        {name}
        {vegeterian}
        {vegan}
      </h2>
      <img src={img} alt="" />
      {stock}
      <p>£{price}</p>
      <p>{description}</p>
      {stockForCart} <br />
      {ifUserAddToFav}
    </article>
  );
};

export default ProductCard;
