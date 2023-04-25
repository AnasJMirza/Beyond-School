import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native";

const Mentor = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Mentor</Text>
      <Button title="go back" onPress={() => navigation.navigate("home")} />
    </View>
  );
};

export default Mentor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
