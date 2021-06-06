import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { firestore } from "../firebase";
import { UserContext } from "../context/userContext";

export const CartContext = createContext({});

export const CartProvider = (props) => {
  const userContext = useContext(UserContext);
  const { user, userIP } = userContext;

  const [userCart, setUserCart] = useState([]);

  const fetchFromUserCart = () => {
    firestore
      .collection("users")
      .doc(user ? user.uid : userIP)
      .collection("Cart")
      .get()
      .then((querySnapshot) => {
        const currentData = querySnapshot.docs.map((doc) => doc.data());
        setUserCart(currentData);
      })
      .catch((err) => console.error(err));
  };

  //   const updateDataBase = (product) => {
  //     firestore
  //       .collection("dataBase")
  //       .doc(product.name)
  //       .update(product)
  //       .then(fetchFromDataBase)
  //       .catch((err) => console.log(err));
  //   };

  const addToCart = (product, howMany) => {
    firestore
      .collection("users")
      .doc(user ? user.uid : userIP)
      .collection("Cart")
      .doc(product.name)
      .set({ ...product, quantityToOrder: howMany })
      .catch((err) => console.log(err));
  };

  const updateQuantityToOrder = (name, action) => {
    console.log(name);
    firestore
      .collection("users")
      .doc(user ? user.uid : userIP)
      .collection("Cart")
      .doc(name)
      .update({
        quantityToOrder: firebase.firestore.FieldValue.increment(
          action === "plus" ? +1 : -1
        ),
      })
      .catch((err) => console.log(err));
  };

  const removeFromCart = (product) => {
    firestore
      .collection("users")
      .doc(user ? user.uid : userIP)
      .collection("Cart")
      .doc(product.name)
      .delete()
      .catch((err) => console.error(err));
  };

  const bought = () => {
    firestore
      .collection("users")
      .doc(user ? user.uid : userIP)
      .collection("Cart")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      })
      .then(fetchFromUserCart)
      //   .then(fetchFromUserFav)
      .then(setTimeout(fetchFromUserCart, 10))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (user) {
      fetchFromUserCart();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        userCart,
        setUserCart,
        addToCart,
        updateQuantityToOrder,
        removeFromCart,
        bought,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
