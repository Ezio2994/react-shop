import React from "react";
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { firestore } from "../../firebase";

const DashBoard = (props) => {
  const {
    user,
    dataBase,
    favComparison,
    addToFav,
    removeFromFav,
    addToCart,
    addToGuestCart,
  } = props;

  return (
    <>
      <ProductCardList
        user={user}
        favComparison={favComparison}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        addToCart={addToCart}
        dataBase={dataBase}
        addToGuestCart={addToGuestCart}
      />
    </>
  );
};

export default DashBoard;
