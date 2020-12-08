import React from "react";
import styles from "./Cart.module.scss";

import CartList from "../../components/CartList"

const Cart = (props) => {
  const { userCart, removeFromCart, bought, dataBase } = props

  const totalCart = userCart.map(cart => {
    const singleTotal = cart.price * cart.quantityToOrder;
    return singleTotal
  })

    const totalCartprova = totalCart.reduce((a, b) => a + b, 0)

    console.log(dataBase);

  return (
    <section>
      <h1>total: £{totalCartprova}</h1>
      <CartList userCart={userCart} removeFromCart={removeFromCart} />
      <button onClick={() => {

        bought()
        }}>Buy</button>
  </section>
  )
};

export default Cart;
