import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { UserContext } from "../context/userContext"
import { logRoles } from "@testing-library/react";

export const CrudContext = createContext({});

export const CrudProvider = (props) => {
    const userContext = useContext(UserContext);
    const { user, userIP } = userContext;

    const [dataBase, setDataBase] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [guestCart, setGuestCart] = useState([]);

    const userDataId = userData.map((data) => data.id);
    const dataBaseId = dataBase.map((data) => data.id);

    const checkIfFav = userDataId.filter((value) => dataBaseId.includes(value));

    const fetchFromDataBase = () => {
        firestore
            .collection("dataBase")
            .get()
            .then((querySnapshot) => {
                const currentData = querySnapshot.docs.map((doc) => doc.data());
                console.log("dataBase request made");
                setDataBase(currentData);
            });
    };

    const fetchFromUserFav = () => {
        firestore
            .collection("users")
            .doc(user.uid)
            .collection("favourites")
            .get()
            .then((querySnapshot) => {
                const currentData = querySnapshot.docs.map((doc) => doc.data());
                console.log("dataBase request made");
                setUserData(currentData);
            })
            .catch((err) => console.error(err));
    };

    const fetchFromUserCart = () => {
        firestore
            .collection("users")
            .doc(user.uid)
            .collection("Cart")
            .get()
            .then((querySnapshot) => {
                const currentData = querySnapshot.docs.map((doc) => doc.data());
                console.log("dataBase request made");
                setUserCart(currentData);
            })
            .catch((err) => console.error(err));
    };

    const fetchFromGuestCart = () => {
        firestore
            .collection("guests")
            .doc(userIP)
            .collection("Cart")
            .get()
            .then((querySnapshot) => {
                const currentData = querySnapshot.docs.map((doc) => doc.data());
                console.log("dataBase request made");
                setGuestCart(currentData);
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

    const addToCart = (product, howMany) => {
        firestore
            .collection("users")
            .doc(user.uid)
            .collection("Cart")
            .doc(product.name)
            .set({ ...product, quantityToOrder: howMany })
            .then(fetchFromUserCart)
            .catch((err) => console.log(err));
    };

    const addToGuestCart = (product, howMany) => {
        firestore
            .collection("guests")
            .doc(userIP)
            .collection("Cart")
            .doc(product.name)
            .set({ ...product, quantityToOrder: howMany })
            .then(fetchFromGuestCart)
            .catch((err) => console.log(err));
    };

    const removeFromCart = (product) => {
        firestore
            .collection("users")
            .doc(user.uid)
            .collection("Cart")
            .doc(product.name)
            .delete()
            .then(fetchFromUserCart)
            .catch((err) => console.error(err));
    };

    const removeFromGuestCart = (product) => {
        firestore
            .collection("guests")
            .doc(userIP)
            .collection("Cart")
            .doc(product.name)
            .delete()
            .then(fetchFromGuestCart)
            .catch((err) => console.error(err));
    };

    const bought = (isUser) => {
        if (isUser) {
            firestore
                .collection("users")
                .doc(user.uid)
                .collection("Cart")
                .get()
                .then((res) => {
                    res.forEach((element) => {
                        element.ref.delete();
                    });
                })
                .then(fetchFromUserCart)
                .then(fetchFromUserFav)
                .then(setTimeout(fetchFromUserCart, 10))
                .catch((err) => console.error(err));
        } else {
            firestore
                .collection("guests")
                .doc(userIP)
                .collection("Cart")
                .get()
                .then((res) => {
                    res.forEach((element) => {
                        element.ref.delete();
                    });
                })
                .then(fetchFromGuestCart)
                .then(fetchFromGuestCart)
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        fetchFromDataBase();
    }, []);

    useEffect(() => {
        if (user) {
            fetchFromUserFav();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchFromUserCart();
        }
    }, [user]);

    useEffect(() => {
        if (userIP) {
            fetchFromGuestCart()
        }
    }, [userIP]);

    return (
        <CrudContext.Provider value={{ dataBase, userData, userCart, guestCart, checkIfFav, addToFav, removeFromFav, addToCart, addToGuestCart, removeFromCart, removeFromGuestCart, bought, fetchFromDataBase, fetchFromGuestCart, addToDataBase }}>
            {props.children}
        </CrudContext.Provider>
    );
};