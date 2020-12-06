import React, { useState, useEffect} from "react";
import styles from "./ProductCardList.module.scss";
import ProductCard from "../ProductCard"
import { firestore } from "../../firebase"


const ProductCardList = () => {
  const [dataBase, setDataBase] = useState([])

  const fetchFromDataBase = () => {
    firestore
    .collection("dataBase")
    .get()
    .then((querySnapshot) => {
      const currentData = querySnapshot.docs.map((doc) => doc.data());
      setDataBase(currentData)
    });
  }

  useEffect(() => {
    fetchFromDataBase()
  }, [])

  const getProductJsx = (product) => (
    <div key={product.id}>
      <ProductCard product={product} />
    </div>
  );


  return <section className={styles.cards}>{dataBase.map(getProductJsx)}</section>;

};

export default ProductCardList;
