import React from "react";
import styles from "./Cart.module.scss";

import CartList from "../../components/CartList"

const Cart = (props) => {
  const { userCart } = props

  return <CartList userCart={userCart} />


};

export default Cart;
