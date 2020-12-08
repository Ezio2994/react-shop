import React from "react";
import styles from "./Cart.module.scss";

import CartList from "../../components/CartList";

const Cart = (props) => {
  const { userCart, removeFromCart, bought, dataBase } = props;

  const totalCart = userCart.map((cart) => {
    const singleTotal = cart.price * cart.quantityToOrder;
    return singleTotal;
  });

  const totalCartprova = totalCart.reduce((a, b) => a + b, 0);

  // const dataBaseQuantity = dataBase.map((cart) => {
  //   const name = cart.name;
  //   const quantity = cart.availability;
  //   return { name: name, quantity: quantity };
  // });

  // const orderingQuantity = userCart.map((cart) => {
  //   const name = cart.name;
  //   const quantity = cart.quantityToOrder;
  //   return { name: name, quantity: quantity };
  // });

  // console.log(dataBaseQuantity);
  // console.log(orderingQuantity);

  // const prova = { ...dataBaseQuantity, ...orderingQuantity };
  // console.log(prova);

  // const findDifference = () => {};

  // const prova =
  // console.log(prova);

  return (
    <section>
      <h1>total: £{totalCartprova}</h1>
      <CartList
        userCart={userCart}
        removeFromCart={removeFromCart}
        dataBase={dataBase}
      />
      <button
        onClick={() => {
          bought();
        }}
      >
        Buy
      </button>
    </section>
  );
};

export default Cart;
