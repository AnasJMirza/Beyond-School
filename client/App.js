import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Providers from "./navigation";
import { NativeBaseProvider } from "native-base";

import { useFonts, Roboto_400Regular, Roboto_900Black, Roboto_700Bold } from "@expo-google-fonts/roboto";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <Providers />
    </NativeBaseProvider>
  );
}
