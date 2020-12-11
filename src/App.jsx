import logo from "./logo.svg";
import "./App.scss";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Routes from "./containers/Routes";
import firebase, { provider, firestore } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [dataBase, setDataBase] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [guestCart, setGuestCart] = useState([]);
  const [userIP, setUsetIp] = useState("");

  const getJSON = () => {
    fetch(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=073d2577c8c04b7b962e16890059eea1"
    )
      .then((res) => res.json())
      .then((res) => {
        setUsetIp(res.ip_address);
      })
      .then(fetchFromGuestCart)
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getJSON();
  }, []);

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

  const array1 = userData.map((data) => data.id);
  const array2 = dataBase.map((data) => data.id);

  const favComparison = array1.filter((value) => array2.includes(value));

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
      .doc(user.uid)
      .collection("favourites")
      .get()
      .then((querySnapshot) => {
        const currentData = querySnapshot.docs.map((doc) => doc.data());
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
        setGuestCart(currentData);
      })
      .catch((err) => console.error(err));
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
      console.log("done");
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
        // .then(fetchFromUserCart)
        // .then(fetchFromUserFav)
        .then(fetchFromGuestCart)
        .then(setTimeout(fetchFromGuestCart, 10))
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
      setInterval(fetchFromGuestCart, 10);
    }
  }, []);

  return (
    <div className="App">
      <NavBar signIn={signIn} signOut={signOut} user={user} />
      <Routes
        user={user}
        favComparison={favComparison}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        addToCart={addToCart}
        dataBase={dataBase}
        setDataBase={setDataBase}
        userData={userData}
        userCart={userCart}
        removeFromCart={removeFromCart}
        bought={bought}
        fetchFromDataBase={fetchFromDataBase}
        addToGuestCart={addToGuestCart}
        guestCart={guestCart}
        fetchFromGuestCart={fetchFromGuestCart}
        userIP={userIP}
        getJSON={getJSON}
        removeFromGuestCart={removeFromGuestCart}
      />
    </div>
  );
}

export default App;
