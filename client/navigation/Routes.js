import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

const Routes = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));
    };
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>
    </UserContext.Provider>
  );
};

export default Routes;
