import React from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard";

const ProductCardList = (props) => {
  const { dataBase } = props;

  const getProductJsx = (product) => (
    <div key={product.id}>
      <ProductCard product={product} />
    </div>
  );

  return (
    <section className={styles.productsContainer}>
      {dataBase.map(getProductJsx)}
    </section>
  );
};

export default ProductCardList;
