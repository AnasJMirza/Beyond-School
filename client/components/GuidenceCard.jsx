import { StyleSheet, Text, View } from "react-native";
import React from "react";

const GuidenceCard = ({ question, answer }) => {
  return (
    <View
      style={{
        backgroundColor: "#7E57C2",
        borderRadius: 8,
        padding: 20,
        marginVertical: 5,
      }}
    >
      <Text style={{ textAlign: "justify", fontSize: 20, fontFamily: "Roboto_700Bold", color: "#fff" }}>
        Q. {question}
      </Text>
      <Text
        style={{ textAlign: "justify", fontSize: 16, fontFamily: "Roboto_400Regular", color: "#fff", marginTop: 4 }}
      >
        {answer}
      </Text>
    </View>
  );
};

export default GuidenceCard;

const styles = StyleSheet.create({});
