import React, { createContext, useState } from "react";

export const FilterContext = createContext({});

export const FilterProvider = (props) => {
    const [Vchecked, setVChecked] = useState(false);
    const [vgChecked, setVgChecked] = useState(false);
    const [startersChecked, setStartersChecked] = useState(false);
    const [dessertsChecked, setDessertsChecked] = useState(false);
    const [mainsChecked, setMainsChecked] = useState(false);



    return (
        <FilterContext.Provider value={{ Vchecked, setVChecked, vgChecked, setVgChecked, startersChecked, setStartersChecked, dessertsChecked, setDessertsChecked, mainsChecked, setMainsChecked }}>
            {props.children}
        </FilterContext.Provider>
    );
};