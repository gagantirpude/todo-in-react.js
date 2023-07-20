// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";
import App from "../App";

//* Initialization and Export
export const Context = createContext({ isAuthentication: false });

//
const CreateContext = () => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider
      value={{
        isAuthentication,
        setIsAuthentication,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

export default CreateContext;
