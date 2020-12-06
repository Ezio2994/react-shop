import React from "react";
import styles from "./CartList.module.scss";

import CartProduct from "../../components/CartProduct"


const CartList = (props) => {
  const { userCart } = props

  const getCartProductJsx = (product) => (
    <div className={styles.cartContainer} key={product.id}>
      <CartProduct product={product} />
    </div>
  );


  return <section className={styles.cartList}>{userCart.map(getCartProductJsx)}</section>;

};

export default CartList;
