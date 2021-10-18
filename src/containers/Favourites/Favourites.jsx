import React, { useContext } from "react";
import styles from "./Favourites.module.scss";
import ProductCardList from "../../components/ProductCardList";
import { CrudContext } from "../../context/crudContext";
import Cart from "../Cart";
import Headroom from "react-headroom";

import NavBar from "../../components/NavBar";

const Favourites = (props) => {
  const { cartOn, setCartOn, width } = props;
  const crudContext = useContext(CrudContext);
  const { userData, dataBase } = crudContext;

  const favourite = dataBase.filter((data) => userData.includes(data.name));
  return (
    <>
      <Headroom
        style={{
          zIndex: 10,
        }}
      >
        <NavBar cartOn={cartOn} setCartOn={setCartOn} />
      </Headroom>
      <h2 className={styles.pageHeader}>Favourites</h2>
      <ProductCardList
        dataBase={favourite}
        cartOn={cartOn}
        width={width}
        setCartOn={setCartOn}
        isFav={true}
      />
      <Cart cartOn={cartOn} setCartOn={setCartOn} width={width} />
    </>
  );
};

export default Favourites;
