import React from "react";
import { StatusBar } from "expo-status-bar";
import Providers from "./navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Providers />
    </>
  );
}
