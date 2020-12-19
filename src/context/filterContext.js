import React, { createContext, useContext, useEffect, useState } from "react";

export const FilterContext = createContext({});

export const FilterProvider = (props) => {
    const [category, setCategory] = useState("");
    const [course, setCourse] = useState("");


    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleCourse = (e) => {
        setCourse(e.target.value)
    }

    const reset = () => {
        setCategory("")
        setCourse("")
    }

    return (
        <FilterContext.Provider value={{ category, course, handleCourse, handleCategory, reset }}>
            {props.children}
        </FilterContext.Provider>
    );
};