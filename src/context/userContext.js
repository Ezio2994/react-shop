import { navigate } from "@reach/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { firestore, provider } from "../firebase";
import { CrudContext } from "./crudContext";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const crudContext = useContext(CrudContext);
  const { fetchFromGuestCart } = crudContext;

  const [user, setUser] = useState(null);
  const [userIP, setUsetIp] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  let i = 0;
  const getJSON = () => {
    const url =
      "https://ipfind.co/?ip=79.67.160.179&auth=45cd7774-c99d-4aa8-95f3-426d14eabc46";
    const proxyUrl = `https://agile-island-79839.herokuapp.com/`;
    fetch(proxyUrl + url)
      .then((res) => res.json())
      .then((res) => {
        if (!i) {
          setUsetIp(res.ip_address);
          console.log("called for IP");
          i++;
        }
      })
      .then(fetchFromGuestCart)
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFromUserAdmin = () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("admin")
      .get()
      .then((querySnapshot) => {
        const currentData = querySnapshot.docs.map((doc) => doc.data());
        setIsUserAdmin(currentData[0].admin);
      })
      .catch();
  };

  const signIn = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const signOut = () => {
    console.log("signed out");
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .then(navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate("/products");
      } else {
        setUser(null);
        if (!userIP) {
          getJSON();
        }
      }
    });
  };

  useEffect(() => {
    getUser();
  });

  useEffect(() => {
    if (user) {
      fetchFromUserAdmin();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, signIn, signOut, userIP, isUserAdmin }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
