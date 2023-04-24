import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { windowHeight } from "../utils/Dimentions";
import Icon from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({ title, iconUrl }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
       {/* <Icon name="google" size={25} color="#3560d8" /> */}
       <Image source={{uri: iconUrl}} style={{width: 25, height: 25}}/>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: 'white',
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 900,
    color: "#000",
  },
});
