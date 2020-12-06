import React from "react";
import styles from "./CartProduct.module.scss";

const CartProduct = (props) => {
  const { 
    name,
    img,
    price,
    quantityToOrder} = props.product

  return (
    <article className={styles.cartProduct}>
      <img src={img} alt=""/>
      <p>{name}</p>
      <p>£{price}</p>
      <p>{quantityToOrder}</p>

    </article>
  );
};

export default CartProduct;
