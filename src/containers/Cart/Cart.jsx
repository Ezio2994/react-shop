import React, { useState, useEffect, useContext } from "react";
import styles from "./Cart.module.scss";
import firebase, { firestore } from "../../firebase";
import { UserContext } from "../../context/userContext"
import { CrudContext } from "../../context/crudContext"

import CartList from "../../components/CartList";

const Cart = () => {
  const crudContext = useContext(CrudContext);
  const { userCart, guestCart, bought, dataBase, fetchFromDataBase, fetchFromGuestCart, userIP } = crudContext
  const userContext = useContext(UserContext)
  const { user } = userContext


  const [dataBaseQuantity, setDataBaseQuantity] = useState(dataBase);

  const totalCart = userCart.map((cart) => {
    const singleTotal = cart.price * cart.quantityToOrder;
    return singleTotal;
  });

  const guestTotalCart = guestCart.map((cart) => {
    const singleTotal = cart.price * cart.quantityToOrder;
    return singleTotal;
  });

  const totalCartprova = user
    ? totalCart.reduce((a, b) => a + b, 0)
    : guestTotalCart.reduce((a, b) => a + b, 0);

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
      setInterval(fetchFromGuestCart, 10);
    }
  }, [userIP]);

  return (
    <section>
      <h1>total: £{totalCartprova}</h1>
      <CartList
        user={user}
        userCart={userCart}
        guestCart={guestCart}
        updateQuantity={updateQuantity}
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
