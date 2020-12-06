import React from "react"
import { Router } from "@reach/router";

import DashBoard from "../DashBoard"
import Favourites from "../Favourites"
import Cart from "../Cart"

const Routes = (props) => {
    const { user, dataBase, userData, favComparison, addToFav, removeFromFav, addToCart, userCart } = props

    return (
        <Router>
            <DashBoard path='/' user={user} favComparison={favComparison} addToFav={addToFav} removeFromFav={removeFromFav} dataBase={dataBase} addToCart={addToCart} />
            <Favourites path='favourites' user={user} favComparison={favComparison} addToFav={addToFav} removeFromFav={removeFromFav} userData={userData} />
            <Cart path="cart" userCart={userCart} />
        </Router>
    )
}

export default Routes