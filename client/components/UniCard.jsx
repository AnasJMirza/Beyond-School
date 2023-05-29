import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Linking } from "react-native";

const UniCard = ({ uni }) => {
  const openLink = () => {
    const url = uni.web_pages[0];
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontFamily: "Roboto_900Black", color: "#fff", textAlign: "center" }}>
        {uni?.name}
      </Text>
      <Text style={{ fontSize: 20, fontFamily: "Roboto_700Bold", color: "#fff", textAlign: "center" }}>
        {uni?.country}
      </Text>
      <TouchableOpacity
        onPress={openLink}
        style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 3, backgroundColor: "#fff" }}
      >
        <Text style={{ fontFamily: "Roboto_400Regular", color: "#7E57C2" }}>Official Website</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UniCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7E57C2",
    width: "100%",
    height: 170,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 6,
  },
});
