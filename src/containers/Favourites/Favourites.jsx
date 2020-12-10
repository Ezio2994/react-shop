import React from "react";
import styles from "./Favourites.module.scss";
import ProductCardList from "../../components/ProductCardList";

const Favourites = (props) => {
  const {
    dataBase,
    userData,
    user,
    favComparison,
    addToFav,
    removeFromFav,
    addToCart,
  } = props;

  const whatsFav = userData.map((user) => user.name);

  const favourited = dataBase.map((data) => {
    if (whatsFav.includes(data.name)) {
      return { ...data };
    } else {
      return null;
    }
  });

  const filteredFav = favourited.filter((fav) => fav !== null);

  // console.log(userData.map((data) => data.name));
  // console.log(prova);

  return (
    <>
      <ProductCardList
        user={user}
        favComparison={favComparison}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        addToCart={addToCart}
        dataBase={filteredFav}
      />
    </>
  );
};

export default Favourites;
