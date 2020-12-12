import "./App.scss";
import React from "react";
import NavBar from "./components/NavBar";
import Routes from "./containers/Routes";
import { CrudProvider } from "./context/crudContext";
import { UserProvider } from "./context/userContext"
import { FilterProvider } from "./context/filterContext"

function App() {

  return (
    <div className="App">
      <UserProvider>
        <CrudProvider>
          <FilterProvider>
            <NavBar />
            <Routes />
          </FilterProvider>
        </CrudProvider>
      </UserProvider>
    </div>
  );
}

export default App;
