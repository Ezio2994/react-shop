import React from "react";
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList"
import { firestore } from "../../firebase"


const DashBoard = () => {
  return (
    <>
      <ProductCardList />
    </>
  );
};

export default DashBoard;
