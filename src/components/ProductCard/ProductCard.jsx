import React, { useEffect, useState, useContext } from "react";
import styles from "./ProductCard.module.scss";
import NotFound from "../NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../data/fa-library";
import { UserContext } from "../../context/userContext";
import { CrudContext } from "../../context/crudContext";

const ProductCard = (props) => {
  const userContext = useContext(UserContext);
  const crudContext = useContext(CrudContext);
  const { user } = userContext;
  const { addToFav, removeFromFav, checkIfFav, addToCart, addToGuestCart } = crudContext;
  const { id, name, img, availability, price, description, category } = props.product;

  const [counter, setCounter] = useState(1);

  const isInStock =
    availability > 0 ? (
      <h3>In stock: {availability}</h3>
    ) : (
        <h3> Out of stock</h3>
      );

  const ifInStockShowCartButtons =
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
        > Add to cart </button>
        <button onClick={() => {
          if (counter > 1) {
            setCounter(counter - 1);
          }
        }}> - </button>
        <button
          onClick={() => {
            if (counter < availability) {
              setCounter(counter + 1);
            }
          }}> + </button>
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

  const heartIcon = checkIfFav.includes(id) ? ["fas", "heart"] : ["far", "heart"];

  const ifUserAddToFav = user ? (
    <span
      onClick={() => {
        if (!checkIfFav.includes(id)) {
          addToFav(props.product);
        } else {
          removeFromFav(props.product);
        }
      }}>
      <FontAwesomeIcon icon={heartIcon} />
    </span>
  ) : (
      <p>LogIn to save this product on your favourites </p>
    );

  const vegeterian = category === "v" ? <span>V</span> : null;
  const vegan = category === "vg" ? <span>Vg</span> : null;
  const something = false;

  // console.log(vegeterian === true);

  const vFilterOn = category === "v" && something ? styles.vFilterOn : '';

  return (
    <article className={`${styles.productCard} ${vFilterOn}`}>
      <h2>
        {name}
        {vegeterian}
        {vegan}
      </h2>
      <img src={img} alt="" />
      {isInStock}
      <p>£{price}</p>
      <p>{description}</p>
      {ifInStockShowCartButtons} <br />
      {ifUserAddToFav}
    </article>
  );
};

export default ProductCard;
