import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { firestore } from "../firebase";
import { UserContext } from "../context/userContext";

export const CrudContext = createContext({});

export const CrudProvider = (props) => {
  const userContext = useContext(UserContext);
  const { user, userIP } = userContext;

  const [dataBase, setDataBase] = useState([]);
  const [userData, setUserData] = useState([]);

  const userDataId = userData.map((data) => data.name);
  const dataBaseId = dataBase.map((data) => data.name);

  const checkIfFav = userDataId.filter((value) => dataBaseId.includes(value));

  const fetchFromDataBase = () => {
    firestore
      .collection("dataBase")
      .get()
      .then((querySnapshot) => {
        const currentData = querySnapshot.docs.map((doc) => doc.data());
        setDataBase(currentData);
      });
  };

  const fetchFromUserFav = () => {
    firestore
      .collection("users")
      .doc(user ? user.uid : userIP)
      .collection("favourites")
      .get()
      .then((querySnapshot) => {
        const currentData = querySnapshot.docs.map((doc) => doc.data());
        setUserData(currentData);
      })
      .catch((err) => console.error(err));
  };

  const addToDataBase = (product) => {
    firestore
      .collection("dataBase")
      .doc(product.name)
      .set(product)
      .then(fetchFromDataBase)
      .catch((err) => console.log(err));
  };

  const updateDataBase = (product) => {
    firestore
      .collection("dataBase")
      .doc(product.name)
      .update(product)
      .then(fetchFromDataBase)
      .catch((err) => console.log(err));
  };

  const deleteDataBaseProduct = (product) => {
    firestore
      .collection("dataBase")
      .doc(product)
      .delete()
      .then(fetchFromDataBase)
      .catch((err) => console.log(err));
  };

  const addToFav = (product) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("favourites")
      .doc(product.name)
      .set(product)
      .then(fetchFromUserFav)
      .catch((err) => console.log(err));
  };

  const removeFromFav = (product) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("favourites")
      .doc(product.name)
      .delete()
      .then(fetchFromUserFav)
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
      // .then(fetchFromUserCart)
      .then(fetchFromUserFav)
      // .then(setTimeout(fetchFromUserCart, 10))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFromDataBase();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFromUserFav();
    }
  }, [user]);

  return (
    <CrudContext.Provider
      value={{
        dataBase,
        userData,
        checkIfFav,
        addToFav,
        removeFromFav,
        bought,
        fetchFromDataBase,
        addToDataBase,
        updateDataBase,
        deleteDataBaseProduct,
      }}
    >
      {props.children}
    </CrudContext.Provider>
  );
};
