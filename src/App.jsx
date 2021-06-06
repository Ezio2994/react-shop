import "./App.scss";
import React from "react";
import NavBar from "./components/NavBar";
import Routes from "./containers/Routes";
import HomePage from "./components/HomePage";
import { CrudProvider } from "./context/crudContext";
import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CrudProvider>
          <CartProvider>
            <Routes />
          </CartProvider>
        </CrudProvider>
      </UserProvider>
    </div>
  );
}

export default App;
