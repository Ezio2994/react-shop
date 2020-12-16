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

  const { signIn, user } = userContext;
  const { addToFav, removeFromFav, checkIfFav, addToCart, addToGuestCart, userCart, guestCart } = crudContext;
  const { id, name, img, availability, price, description, category } = props.product;

  const [counter, setCounter] = useState(1);

  const getQuantityOnUserCart = userCart.map(curr => {
    if (curr.id === id) {
      return curr.quantityToOrder
    } else {
      return null
    }
  })

  const getQuantityOnGuestCart = guestCart.map(curr => {
    if (curr.id === id) {
      return curr.quantityToOrder
    } else {
      return null
    }
  })

  const quantityOnUserCart = getQuantityOnUserCart.filter(curr => curr !== null)
  const quantityOnGuestCart = getQuantityOnGuestCart.filter(curr => curr !== null)


  console.log(Number(quantityOnUserCart) + counter);

  const isInStock =
    availability > 0 ? (
      <h3>In stock: {availability}</h3>
    ) : (
        <h3> Out of stock</h3>
      );

  const ifInStockShowCartButtons =
    availability > 0 ? (
      <>
        <button onClick={() => {
          if (counter > 1) {
            setCounter(counter - 1);
          }
        }}> - </button>
        <input
          type="number"
          name="counter"
          id="counter"
          value={counter}
          readOnly
        />
        <button
          onClick={() => {
            if (counter < availability) {
              setCounter(counter + 1);
            }
          }}> + </button>
        <button className={styles.add}
          onClick={() => {
            if (user) {
              addToCart(props.product, Number(quantityOnUserCart) + counter);
            } else {
              addToGuestCart(props.product, Number(quantityOnGuestCart) + counter);
            }
          }}
        > ADD</button>
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
      <p><span onClick={signIn}>LogIn</span> to save this product on your favourites </p>
    );

  const vegeterian = category === "v" ? <span>V</span> : null;
  const vegan = category === "vg" ? <span>Vg</span> : null;

  return (
    <article className={styles.productCard}>
      <h2>
        {name}
        {vegeterian}
        {vegan}
      </h2>
      <img src={img} alt="" />
      {isInStock}
      <h3>£{price}</h3>
      <article>
        <p>{description}</p>
      </article>
      {ifInStockShowCartButtons} <br />
      {ifUserAddToFav}
    </article>
  );
};

export default ProductCard;
