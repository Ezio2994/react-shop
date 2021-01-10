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
  const { userCart, guestCart, bought, fetchFromDataBase, fetchFromGuestCart, userIP } = crudContext
  const { reset } = filterContext

  useEffect(() => {
    reset()
  }, [])

  const userTotalCart = userCart.map((cart) => {
    const total = cart.price * cart.quantityToOrder;
    return total;
  });

  let currentCart = []

  if (user) {
    userCart.forEach(product => {
      currentCart.push({ [product.name]: product.quantityToOrder })
    })
  } else {
    guestCart.forEach(product => {
      currentCart.push({ [product.name]: product.quantityToOrder })
    })
  }

  const updateQuantity = () => {
    currentCart.forEach(product => updateDataBaseQuantity(...Object.keys(product), ...Object.values(product)))
  }

  const updateDataBaseQuantity = (name, quantity) => {
    firestore
      .collection("dataBase")
      .doc(name)
      .update({ availability: firebase.firestore.FieldValue.increment(- quantity) })
      .then(fetchFromDataBase)
      .catch((err) => console.log(err));
  };

  const guestTotalCart = guestCart.map((cart) => {
    const total = cart.price * cart.quantityToOrder;
    return total;
  });

  const totalCartPrice = user
    ? userTotalCart.reduce((a, b) => a + b, 0)
    : guestTotalCart.reduce((a, b) => a + b, 0);

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
          <h2>Total: £{totalCartPrice}</h2>
          <button
            onClick={() => {
              updateQuantity()
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
        />
      </section>
    </>
  );
};

export default Cart;
