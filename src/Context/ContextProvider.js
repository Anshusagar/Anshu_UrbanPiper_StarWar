import React from 'react';

export const AuthContext = React.createContext();

AuthContext.displayName = 'Anshu Sagar';

function ContextProvider({ children }) {
  const [data, setData] = React.useState({});

  const value = {
    data,
    setData
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { ContextProvider };
