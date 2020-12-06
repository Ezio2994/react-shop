import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.scss";
import NotFound from "../NotFound"

const ProductCard = (props) => {
  const {
    name,
    img,
    availability
  } = props.product;

  const stock = availability > 0 ? (
    <h3>In stock: {availability}</h3>
  ) : (
    <h3> Out of stock</h3>
  )


  return (
    <article className={styles.productCard}>
    <h2>{name}</h2>
    <img src={img} alt=""/>
    {stock}
    
  </article>
  )
};

export default ProductCard;
