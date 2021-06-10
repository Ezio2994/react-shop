import React, { useContext } from "react";
import styles from "./DashBoard.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext";
import NavBar from "../../components/NavBar";
import Cart from "../Cart";
import disableScroll from "disable-scroll";

const DashBoard = (props) => {
  const { cartOn, setCartOn, width, scrollDir } = props;
  const crudContext = useContext(CrudContext);
  const { dataBase } = crudContext;

  return (
    <>
      <NavBar
        cartOn={cartOn}
        setCartOn={setCartOn}
        width={width}
        scrollDir={scrollDir}
      />
      <h2 className={styles.pageHeader}>Dishes</h2>
      <main
        onMouseOver={() => (cartOn ? disableScroll.on() : null)}
        className={styles.dashBoard}
      >
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
