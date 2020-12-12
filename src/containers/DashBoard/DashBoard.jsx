import React, { useContext } from "react";
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext"


const DashBoard = () => {
  const crudContext = useContext(CrudContext);
  const { dataBase } = crudContext;

  return (
    <>
      <ProductCardList dataBase={dataBase} />
    </>
  );
};

export default DashBoard;
