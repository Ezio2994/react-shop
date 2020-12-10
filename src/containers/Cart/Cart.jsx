import React, { useState, useEffect } from "react";
import styles from "./Cart.module.scss";
import firebase, { firestore } from "../../firebase";

import CartList from "../../components/CartList";

const Cart = (props) => {
  const {
    user,
    userCart,
    removeFromCart,
    bought,
    dataBase,
    fetchFromDataBase,
  } = props;
  const [dataBaseQuantity, setDataBaseQuantity] = useState(dataBase);

  const totalCart = userCart.map((cart) => {
    const singleTotal = cart.price * cart.quantityToOrder;
    return singleTotal;
  });

  const totalCartprova = totalCart.reduce((a, b) => a + b, 0);

  const startUpdate = () => {
    for (let index = 0; index < dataBaseQuantity.length; index++) {
      updateDataBaseQuantity(
        dataBaseQuantity[index].name,
        dataBaseQuantity[index]
      );
    }
  };

  const updateDataBaseQuantity = (name, product) => {
    firestore
      .collection("dataBase")
      .doc(name)
      .set({ ...product })
      .then(fetchFromDataBase)
      .catch((err) => console.log(err));
  };

  const updateQuantity = (value, id, operator) => {
    const newScores = dataBaseQuantity.map((scoreObj) => {
      if (scoreObj.id === id && operator === "-") {
        return { ...scoreObj, availability: scoreObj.availability - value };
      } else if (scoreObj.id === id && operator === "+") {
        return { ...scoreObj, availability: scoreObj.availability + value };
      } else {
        return scoreObj;
      }
    });
    setDataBaseQuantity(newScores);
  };

  return (
    <section>
      <h1>total: £{totalCartprova}</h1>
      <CartList
        userCart={userCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <button
        onClick={() => {
          startUpdate();
          bought();
        }}
      >
        Buy
      </button>
    </section>
  );
};

export default Cart;
