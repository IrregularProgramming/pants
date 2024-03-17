// Context.js
import React, { createContext, useState } from 'react';

const InitialState = {
  off: true,
  reset: false, 
  latitude: 0,
  longitude: 0
};

export const Context = createContext();


const Store = ({ children }) => {
  const [state, setState] = useState(InitialState);

  return (
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  );
};

export default Store;