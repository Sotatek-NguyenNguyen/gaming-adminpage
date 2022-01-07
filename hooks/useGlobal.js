import React from 'react';
import GlobalContext from "../contexts/globalContext";

export const useGlobal = () => {
    const context = React.useContext(GlobalContext);
    return context;
};