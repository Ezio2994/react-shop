import React, { useState, useEffect, useContext } from "react";
import styles from "./Cart.module.scss";
import firebase, { firestore } from "../../firebase";
import { UserContext } from "../../context/userContext"
import { CrudContext } from "../../context/crudContext"
import { FilterContext } from "../../context/filterContext";

import NavBar from "../../components/NavBar"
import CartList from "../../components/CartList";

const Cart = () => {
  const userContext = useContext(UserContext)
  const crudContext = useContext(CrudContext);
  const filterContext = useContext(FilterContext);
  const { user } = userContext
  const { userCart, guestCart, bought, dataBase, fetchFromDataBase, fetchFromGuestCart, userIP } = crudContext
  const { reset } = filterContext

  useEffect(() => {
    reset()
  }, [])


  const [dataBaseQuantity, setDataBaseQuantity] = useState(dataBase);

  const userTotalCart = userCart.map((cart) => {
    const total = cart.price * cart.quantityToOrder;
    return total;
  });

  const guestTotalCart = guestCart.map((cart) => {
    const total = cart.price * cart.quantityToOrder;
    return total;
  });

  const totalCartprova = user
    ? userTotalCart.reduce((a, b) => a + b, 0)
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
      fetchFromGuestCart()
    }
  }, [userIP]);

  return (
    <>
      <NavBar />
      <section className={styles.cart}>
        <article className={styles.buyTotal}>
          <h2>total: £{totalCartprova}</h2>
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
        </article>
        <CartList
          user={user}
          userCart={userCart}
          guestCart={guestCart}
          updateQuantity={updateQuantity}
        />
      </section>
    </>
  );
};

export default Cart;
