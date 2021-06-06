import React, { useContext, useEffect } from "react";
import styles from "./Favourites.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext";

import NavBar from "../../components/NavBar";

const Favourites = () => {
  const crudContext = useContext(CrudContext);
  const { userData, dataBase } = crudContext;

  const favourite = dataBase.filter((data) => userData.includes(data.name));
  return (
    <>
      <NavBar />
      <ProductCardList dataBase={favourite} />
    </>
  );
};

export default Favourites;
