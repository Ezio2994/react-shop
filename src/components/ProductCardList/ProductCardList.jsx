import React, { useContext } from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard";
import { FilterContext } from "../../context/filterContext";

const ProductCardList = (props) => {
  const filterContext = useContext(FilterContext);
  const { Vchecked, vgChecked, startersChecked, dessertsChecked, mainsChecked } = filterContext;
  let { dataBase } = props;

  if (Vchecked) {
    dataBase = dataBase.filter(data => data.category === 'v' || data.category === 'vg')
  }

  if (vgChecked) {
    dataBase = dataBase.filter(data => data.category === 'vg')
  }

  if (startersChecked) {
    dataBase = dataBase.filter(data => data.course === 'starter')
  }

  if (dessertsChecked) {
    dataBase = dataBase.filter(data => data.course === 'dessert')
  }

  if (mainsChecked) {
    dataBase = dataBase.filter(data => data.course === 'main')
  }

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
