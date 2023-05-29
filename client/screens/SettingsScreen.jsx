import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SettingsScreen = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "Roboto_700Bold",
          color: "#7E57C2",
        }}
      >
        App settings
      </Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
