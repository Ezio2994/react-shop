import React from "react"
import { Router } from "@reach/router";

import DashBoard from "../DashBoard"
import Favourites from "../Favourites"

const Routes = (props) => {
    const { user } = props

    return (
        <Router>
            <DashBoard path='/' user={user} />
            <Favourites path='favourites' />
        </Router>
    )
}

export default Routes