import React from "react";
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList"
import { firestore } from "../../firebase"


const DashBoard = (props) => {
  const { user } = props

  return (
    <>
      <ProductCardList user={user} />
    </>
  );
};

export default DashBoard;
