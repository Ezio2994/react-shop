import React from "react";
import { Router } from "@reach/router";

import DashBoard from "../DashBoard";
import Favourites from "../Favourites";
import Cart from "../Cart";

const Routes = (props) => {
  const {
    user,
    dataBase,
    userData,
    favComparison,
    addToFav,
    removeFromFav,
    addToCart,
    userCart,
    removeFromCart,
    bought,
    fetchFromDataBase,
    addToGuestCart,
    guestCart,
    fetchFromGuestCart,
    userIP,
    getJSON,
    removeFromGuestCart,
  } = props;

  return (
    <Router>
      <DashBoard
        path="/"
        user={user}
        favComparison={favComparison}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        dataBase={dataBase}
        addToCart={addToCart}
        addToGuestCart={addToGuestCart}
      />
      <Favourites
        path="favourites"
        dataBase={dataBase}
        user={user}
        favComparison={favComparison}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        addToCart={addToCart}
        userData={userData}
      />
      <Cart
        path="cart"
        user={user}
        userCart={userCart}
        removeFromCart={removeFromCart}
        bought={bought}
        dataBase={dataBase}
        fetchFromDataBase={fetchFromDataBase}
        guestCart={guestCart}
        fetchFromGuestCart={fetchFromGuestCart}
        userIP={userIP}
        getJSON={getJSON}
        removeFromGuestCart={removeFromGuestCart}
      />
    </Router>
  );
};

export default Routes;
