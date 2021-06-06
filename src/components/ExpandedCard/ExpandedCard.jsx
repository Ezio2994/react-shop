import React, { useState, useContext } from "react";
import styles from "./ExpandedCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CrudContext } from "../../context/crudContext";
import { CartContext } from "../../context/cartContext";

const ExpandedCard = (props) => {
  const { setExpanded, expanded, user, signIn } = props;
  const { name, img, availability, price, description, category } =
    props.product;
  const crudContext = useContext(CrudContext);
  const { addToFav, removeFromFav, userData, setUserData } = crudContext;
  const cartContext = useContext(CartContext);
  const { addToCart, userCart, setUserCart } = cartContext;

  const [counter, setCounter] = useState(1);
  const [added, setAdded] = useState(false);

  const quantityOnUserCart = userCart.find((product) => product.name === name)
    ? userCart.find((product) => product.name === name).quantityToOrder
    : 0;

  const ifInStockShowCartButtons =
    availability - quantityOnUserCart > 0 ? (
      <div className={styles.counter}>
        <p>Quantity Available: {availability - quantityOnUserCart}</p>
        <div>
          <button
            onClick={() => {
              if (counter > 1) {
                setCounter(counter - 1);
              }
            }}
          >
            <FontAwesomeIcon icon={("fa", "minus")} />
          </button>
          <input
            type="number"
            name="counter"
            id="counter"
            value={counter}
            readOnly
          />
          <button
            onClick={() => {
              if (counter < availability - quantityOnUserCart) {
                setCounter(counter + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={("fa", "plus")} />
          </button>
        </div>
      </div>
    ) : (
      <button className={styles.add}> Out of stock</button>
    );

  const ifUserShowFavOpt = user ? (
    <span
      onClick={() => {
        if (!userData.includes(name)) {
          addToFav(name);
          setUserData([...userData, name]);
        } else {
          removeFromFav(name);
          setUserData(userData.filter((product) => product !== name));
        }
      }}
    >
      <FontAwesomeIcon
        icon={userData.includes(name) ? ["fas", "heart"] : ["far", "heart"]}
      />
    </span>
  ) : (
    <p>
      <span onClick={signIn}>LogIn</span> to save this product on your
      favourites{" "}
    </p>
  );

  const add = () => {
    setCounter(1);
    addToCart(props.product, Number(quantityOnUserCart) + counter);
    setAdded(false);
    setTimeout(setAdded, 100, true);

    if (!userCart.map((thisProduct) => thisProduct.name).includes(name)) {
      setUserCart([
        ...userCart,
        {
          ...props.product,
          quantityToOrder: Number(quantityOnUserCart) + counter,
        },
      ]);
    } else {
      setUserCart(
        userCart.map((thisProduct) => {
          if (thisProduct.name === name) {
            return {
              ...thisProduct,
              quantityToOrder: Number(quantityOnUserCart) + counter,
            };
          } else {
            return thisProduct;
          }
        })
      );
    }
  };

  return (
    <article
      style={expanded === name ? { display: "flex" } : { display: "none" }}
      className={styles.expandedCard}
    >
      <FontAwesomeIcon
        className={styles.closeIcon}
        onClick={() => setExpanded(false)}
        icon="times"
      />
      <img src={img} alt={name + " pic"} />
      <h2>
        {name}{" "}
        <button
          style={
            category === "v" || category === "vg"
              ? { display: "inline-block" }
              : { display: "none" }
          }
        >
          {category}
        </button>
      </h2>
      <p>${price}</p>
      {ifInStockShowCartButtons}
      {availability - quantityOnUserCart > 0 ? (
        <button className={styles.add} onClick={() => add()}>
          Add To Cart
        </button>
      ) : null}
      <p style={added ? { display: "block" } : { display: "none" }}>
        Item added to the cart
      </p>
      <p>{description}</p>
      {ifUserShowFavOpt}
    </article>
  );
};

export default ExpandedCard;
