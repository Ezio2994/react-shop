import React, { useContext, useEffect } from "react";
import styles from "./Favourites.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext";
import { FilterContext } from "../../context/filterContext";

import NavBar from "../../components/NavBar"

const Favourites = (props) => {
  const crudContext = useContext(CrudContext)
  const filterContext = useContext(FilterContext);
  const { userData, dataBase } = crudContext
  const { reset } = filterContext

  useEffect(() => {
    reset()
  }, [])

  const whatsFav = userData.map((user) => user.name);

  const favourited = dataBase.map((data) => {
    if (whatsFav.includes(data.name)) {
      return { ...data };
    } else {
      return null;
    }
  });

  const filteredFav = favourited.filter((fav) => fav !== null);

  return (
    <>
      <NavBar />
      <ProductCardList dataBase={filteredFav} />
    </>
  );
};

export default Favourites;
