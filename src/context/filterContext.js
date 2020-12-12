import React, { createContext, useContext, useEffect, useState } from "react";
import firebase, { provider } from "../firebase";

export const FilterContext = createContext({});

export const FilterProvider = (props) => {
    const [filter, setFilter] = useState([])
    console.log(filter);


    const handleFilters = (filter) => {
        setFilter(filter)
    }

    console.log();


    return (
        <FilterContext.Provider value={{ handleFilters }}>
            {props.children}
        </FilterContext.Provider>
    );
};