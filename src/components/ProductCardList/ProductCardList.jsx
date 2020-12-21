import React, { useContext } from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard";
import { FilterContext } from "../../context/filterContext";

const ProductCardList = (props) => {
  const filterContext = useContext(FilterContext);
  const { category, course } = filterContext;
  let { dataBase } = props;

  if (category === "vegeterian") {
    dataBase = dataBase.filter(data => data.category === 'v' || data.category === 'vg')
  } else if (category === "vegan") {
    dataBase = dataBase.filter(data => data.category === 'vg')
  }

  if (course === "starter") {
    dataBase = dataBase.filter(data => data.course === 'starter')
  } else if (course === "dessert") {
    dataBase = dataBase.filter(data => data.course === 'dessert')
  } else if (course === "main") {
    dataBase = dataBase.filter(data => data.course === 'main')
  }

  const getProductJsx = (product) => (
    <div key={product.name}>
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
