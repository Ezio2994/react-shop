import React, { useState, useEffect } from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard";

const ProductCardList = (props) => {
  const {
    user,
    dataBase,
    favComparison,
    addToFav,
    removeFromFav,
    addToCart,
  } = props;

  const getProductJsx = (product) => (
    <div key={product.id}>
      <ProductCard
        product={product}
        user={user}
        favComparison={favComparison}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        addToCart={addToCart}
      />
    </div>
  );

  return (
    <section className={styles.productsContainer}>
      {dataBase.map(getProductJsx)}
    </section>
  );
};

export default ProductCardList;
