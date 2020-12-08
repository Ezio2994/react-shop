import React from "react";
import styles from "./Favourites.module.scss";
import ProductCardList from "../../components/ProductCardList"

const Favourites = (props) => {
  const { userData,  user, favComparison, addToFav, removeFromFav, addToCart } = props

  return (
    <>
      <ProductCardList user={user} favComparison={favComparison} addToFav={addToFav} removeFromFav={removeFromFav} addToCart={addToCart} dataBase={userData} />
    </>
  );
};

export default Favourites;
