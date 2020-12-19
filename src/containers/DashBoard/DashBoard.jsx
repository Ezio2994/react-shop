import React, { useContext, useEffect } from "react";
import { Link } from "@reach/router"
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext";
import { FilterContext } from "../../context/filterContext";
import NavBar from "../../components/NavBar";


const DashBoard = () => {
  const crudContext = useContext(CrudContext);
  const filterContext = useContext(FilterContext);
  const { dataBase } = crudContext;
  const { reset } = filterContext

  useEffect(() => {
    reset()
  }, [])

  return (
    <>
      <Link to="/">
        <h1 className={styles.mobileHeader}>The Sicilian Shop</h1>
      </Link>
      <NavBar />
      <ProductCardList dataBase={dataBase} />
    </>
  );
};

export default DashBoard;
