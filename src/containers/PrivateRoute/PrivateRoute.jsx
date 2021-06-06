import React, { useEffect } from "react";
import firebase from "../../firebase";
import { navigate } from "@reach/router";

const PrivateRoute = (props) => {
  const { children } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
