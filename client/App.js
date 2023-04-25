import React from "react";
import { StatusBar } from "expo-status-bar";
import Providers from "./navigation";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <Providers />
    </NativeBaseProvider>
  );
}
