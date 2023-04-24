import React, { createContext, useState } from "react";
import Routes from "./Routes";
import AuthProvider from "./AuthProvider";

const Providers = () => {
  
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Providers;
