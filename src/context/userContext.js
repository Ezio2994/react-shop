import { navigate } from "@reach/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { firestore, provider } from "../firebase";
import { CrudContext } from "./crudContext"

export const UserContext = createContext({});

export const UserProvider = (props) => {
    const crudContext = useContext(CrudContext)
    const { fetchFromGuestCart } = crudContext

    const [user, setUser] = useState(null);
    const [userIP, setUsetIp] = useState("");
    const [isUserAdmin, setIsUserAdmin] = useState(false)


    const getJSON = () => {
        const url = `https://api.astroip.co/2.99.115.173?api_key=a45dc99e-f914-4961-8009-54fca96d8819`
        const proxyUrl = `https://agile-island-79839.herokuapp.com/`
        fetch(proxyUrl + url)
            .then((res) => res.json())
            .then((res) => {
                setUsetIp(res.requester_ip);
                console.log(res.requester_ip);
            })
            .then(fetchFromGuestCart)
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(user);

    const fetchFromUserAdmin = () => {
        firestore
            .collection("users")
            .doc(user.uid)
            .collection("admin")
            .get()
            .then((querySnapshot) => {
                const currentData = querySnapshot.docs.map((doc) => doc.data());
                console.log("dataBase request made");
                setIsUserAdmin(currentData[0].admin);
            })
            .catch((err) => console.error(err));
    };


    const signIn = () => {
        firebase.auth().signInWithRedirect(provider)
    };

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
            }).then(
                navigate('/')
            )
            .catch((error) => {
                console.log(error);
            });
    };

    const getUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                navigate("/products")
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
    }, [userIP]);

    useEffect(() => {
        if (user) {
            fetchFromUserAdmin()
        }
    }, [user])


    return (
        <UserContext.Provider value={{ user, signIn, signOut, userIP, isUserAdmin }}>
            {props.children}
        </UserContext.Provider>
    );
};