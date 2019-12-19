import React, { useState, useContext, createContext } from 'react';

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

const NavigationContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <NavigationContext.Provider value={{ userId, setUserId }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextProvider;
