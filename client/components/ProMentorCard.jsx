import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProMentorCard = ({ mentor }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: mentor?.profile,
          }}
          style={styles.imageDimention}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "Roboto_700Bold", fontSize: 29, color: "#fff" }}>{mentor?.name}</Text>
        <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 19, color: "#fff" }}>{mentor?.speciality}</Text>
        <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 19, color: "#fff" }}>{mentor?.experience} years</Text>
        <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 19, color: "#fff" }}>{mentor?.rating}</Text>
      </View>
    </View>
  );
};

export default ProMentorCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7E57C2",
    height: 170,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    gap: 10,
  },

  imageDimention: {
    width: 170,
    height: 170,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
