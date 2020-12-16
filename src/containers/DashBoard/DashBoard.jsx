import React, { useContext } from "react";
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext"
import NavBar from "../../components/NavBar"


const DashBoard = () => {
  const crudContext = useContext(CrudContext);
  const { dataBase } = crudContext;

  return (
    <>
      <NavBar />
      <ProductCardList dataBase={dataBase} />
    </>
  );
};

export default DashBoard;
