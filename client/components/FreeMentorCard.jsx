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
      <Text>{mentor?.name}</Text>
    </View>
  );
};

export default FreeMentorCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#66ca62",
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
});
