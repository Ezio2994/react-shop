import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { firestore } from "../firebase";
import { UserContext } from "../context/userContext";

export const CartContext = createContext({});

export const CartProvider = (props) => {
  const userContext = useContext(UserContext);
  const { user, userIP } = userContext;
  const [userCart, setUserCart] = useState([]);

  const userID = user ? user.uid : userIP;

  const fetchFromUserCart = () => {
    if (userID) {
      firestore
        .collection("users")
        .doc(userID)
        .collection("Cart")
        .get()
        .then((querySnapshot) => {
          const currentData = querySnapshot.docs.map((doc) => doc.data());
          if (currentData.length) {
            setUserCart(currentData);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addToCart = (product, howMany) => {
    if (userID) {
      firestore
        .collection("users")
        .doc(userID)
        .collection("Cart")
        .doc(product.name)
        .set({ ...product, quantityToOrder: howMany })
        .catch((err) => console.log(err));
    }
  };

  const updateQuantityToOrder = (name, action) => {
    if (userID) {
      firestore
        .collection("users")
        .doc(userID)
        .collection("Cart")
        .doc(name)
        .update({
          quantityToOrder: firebase.firestore.FieldValue.increment(
            action === "plus" ? +1 : -1
          ),
        })
        .catch((err) => console.log(err));
    }
  };

  const removeFromCart = (product) => {
    if (userID) {
      firestore
        .collection("users")
        .doc(userID)
        .collection("Cart")
        .doc(product.name)
        .delete()
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (userID) {
      fetchFromUserCart();
    }
  }, [userID]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CartContext.Provider
      value={{
        userCart,
        setUserCart,
        addToCart,
        updateQuantityToOrder,
        removeFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
