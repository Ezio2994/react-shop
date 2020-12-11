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
    guestCart,
    fetchFromGuestCart,
    userIP,
    getJSON,
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

  useEffect(() => {
    if (userIP) {
      setTimeout(fetchFromGuestCart, 1000);
    }
  }, []);

  // useEffect(() => {
  //   setTimeout(getJSON, 1000);
  // }, []);

  return (
    <section>
      <h1>total: £{totalCartprova}</h1>
      <CartList
        user={user}
        userCart={userCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        guestCart={guestCart}
      />
      <button
        onClick={() => {
          startUpdate();
          if (user) {
            bought(true);
          } else {
            bought(false);
          }
        }}
      >
        Buy
      </button>
    </section>
  );
};

export default Cart;
