import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "./AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);

  

  onAuthStateChanged(auth, (user) => {
    if (user){
        setUser(user)
    } else {
        setUser(null)
    }
  });

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
