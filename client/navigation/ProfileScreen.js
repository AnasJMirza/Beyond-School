import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "./Routes";

const ProfileScreen = ({ navigation }) => {
  const { user } = React.useContext(UserContext);
  return (
    <SafeAreaView>
      <View style={styles.bg}>
        <Text style={{ fontSize: 30, fontFamily: "Roboto_400Regular", color: "#fff", letterSpacing: 14 }}>
          What Next
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {user?.profile ? (
          <Image
            source={{
              uri: user.profile,
            }}
            style={styles.imageStyle}
          />
        ) : (
          <Image source={require("../assets/anas-ai.jpeg")} style={styles.imageStyle} />
        )}
      </TouchableOpacity>

      <View style={{ marginTop: 120, alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontFamily: "Roboto_700Bold", textTransform: "capitalize" }}>{user?.name}</Text>
        <Text style={{ fontSize: 15, fontFamily: "Roboto_400Regular" }}>{user?.email}</Text>
        <Text style={{ fontSize: 15, fontFamily: "Roboto_400Regular", textTransform: "capitalize" }}>{user?.role}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 300,
    backgroundColor: "#7E57C2",
    alignItems: "center",
    paddingTop: 60,
  },

  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#fff",
    position: "absolute",
    top: -100,
    left: "50%",
    transform: [{ translateX: -100 }],
  },
});
