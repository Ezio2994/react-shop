import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { firestore } from "../firebase";
import { UserContext } from "../context/userContext";

export const CrudContext = createContext({});

export const CrudProvider = (props) => {
  const userContext = useContext(UserContext);
  const { user, userIP } = userContext;

  const [dataBase, setDataBase] = useState([]);
  const [userData, setUserData] = useState([]);

  const userID = user ? user.uid : userIP;

  const fetchFromDataBase = () => {
    firestore
      .collection("dataBase")
      .get()
      .then((querySnapshot) => {
        console.log("db called");
        const currentData = querySnapshot.docs.map((doc) => doc.data());
        setDataBase(currentData);
      });
  };

  const fetchFromUserFav = () => {
    firestore
      .collection("users")
      .doc(userID)
      .collection("favourites")
      .doc("list")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data().names);
        }
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

  const addToFav = (name) => {
    if (!userData.length) {
      firestore
        .collection("users")
        .doc(user.uid)
        .collection("favourites")
        .doc("list")
        .set({ names: [name] })
        .catch((err) => console.log(err));
    } else {
      firestore
        .collection("users")
        .doc(user.uid)
        .collection("favourites")
        .doc("list")
        .update({
          names: firebase.firestore.FieldValue.arrayUnion(name),
        });
    }
  };

  const removeFromFav = (name) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("favourites")
      .doc("list")
      .update({
        names: firebase.firestore.FieldValue.arrayRemove(name),
      });
  };

  const bought = () => {
    if (userID) {
      firestore
        .collection("users")
        .doc(userID)
        .collection("Cart")
        .get()
        .then((res) => {
          res.forEach((element) => {
            element.ref.delete();
          });
        })
        .then(fetchFromDataBase)
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchFromDataBase();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userID) {
      fetchFromUserFav();
    }
  }, [userID]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CrudContext.Provider
      value={{
        dataBase,
        userData,
        setUserData,
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
