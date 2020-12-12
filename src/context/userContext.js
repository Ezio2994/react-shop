import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { provider } from "../firebase";
import { CrudContext } from "./crudContext"

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const crudContext = useContext(CrudContext)
    const { fetchFromGuestCart } = crudContext

    const [user, setUser] = useState(null);
    const [userIP, setUsetIp] = useState("");

    const getJSON = () => {
        fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=073d2577c8c04b7b962e16890059eea1")
        .then((res) => res.json())
        .then((res) => {
            setUsetIp(res.ip_address);
        })
        .then(fetchFromGuestCart)
        .catch((err) => {
        console.log(err);
        });
    };

    const signIn = () => {
        firebase.auth().signInWithRedirect(provider);
    };

    const signOut = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {
        setUser(null);
        })
        .catch((error) => {
        console.log(error);
        });
    };

    const getUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    };

    useEffect(() => {
    getUser();
    });

    useEffect(() => {
        getJSON();
    }, []);


return (
    <UserContext.Provider value={{ user, signIn, signOut, userIP }}>
        {props.children}
    </UserContext.Provider>
    );
};