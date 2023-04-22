import { View, Text } from "react-native";
import React, { createContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error) {
            console.log(error);
          }
        },
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (error) {
            console.log(error);
          }
        },

        logout: async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.log(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
