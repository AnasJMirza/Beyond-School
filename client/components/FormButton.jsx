import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { windowHeight } from "../utils/Dimentions";

const FormButton = ({ title, loader, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {loader ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#7E57C2",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 900,
    color: "#fff",
  },
});
