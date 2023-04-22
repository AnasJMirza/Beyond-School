import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { windowHeight } from "../utils/Dimentions";

const FormInput = ({ placeholder, ...rest }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor="#666"
        {...rest}
      /> 
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
