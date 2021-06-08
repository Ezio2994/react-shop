import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext";
import NavBar from "../../components/NavBar";
import Cart from "../Cart";

const DashBoard = (props) => {
  const { cartOn, setCartOn, width } = props;
  const crudContext = useContext(CrudContext);
  const { dataBase } = crudContext;

  return (
    <>
      <NavBar setCartOn={setCartOn} />
      <h2 className={styles.pageHeader}>Dishes</h2>
      <main className={styles.dashBoard}>
        <ProductCardList
          dataBase={dataBase}
          cartOn={cartOn}
          setCartOn={setCartOn}
          width={width}
        />
        <Cart cartOn={cartOn} setCartOn={setCartOn} width={width} />
      </main>
    </>
  );
};

export default DashBoard;
