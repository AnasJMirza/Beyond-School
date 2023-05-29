import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const FreeMentorCard = ({ mentor }) => {
  console.log(mentor);
  return (
    <View style={styles.container}>
      {mentor?.profile ? (
        <Image
          source={{
            uri: mentor?.profile,
          }}
          style={styles.imageDimentions}
        />
      ) : (
        <Image source={require("../assets/anas-ai.jpeg")} style={styles.imageDimentions} />
      )}
      <View style={styles.textContainer}>
        <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 20, color: "#fff" }}>{mentor?.name}</Text>
        <View style={styles.subText}>
          <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 14, color: "#fff" }}>{mentor?.speciality}</Text>
          <Text style={{ fontFamily: "Roboto_400Regular", fontSize: 14, color: "#fff" }}>{mentor?.rating}</Text>
        </View>
      </View>
    </View>
  );
};

export default FreeMentorCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7E57C2",
    width: 130,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  imageDimentions: {
    width: 130,
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  textContainer: {
    paddingHorizontal: 5,
    paddingTop: 2,
  },

  subText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
