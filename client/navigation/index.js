import React, { createContext, useState } from "react";
import Routes from "./Routes";

export const UserContext = createContext();

const Providers = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes />
    </UserContext.Provider>
  );
};

export default Providers;
