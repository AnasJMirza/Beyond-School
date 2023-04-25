import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export const UserContext = createContext();

const Routes = () => {
  const [user, setUser] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default Routes;
