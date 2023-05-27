import { Image, ImageBackground, StyleSheet, Text, Touchable, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toaster } from "../utils/helper";
import { UserContext } from "../navigation/Routes";
import { useToast } from "native-base";

const CustomDrawer = (props) => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const handleLogout = async () => {
    try {
      console.log("logout");
      await AsyncStorage.removeItem("user");
      setUser(null);
      toaster("Logout Successful", "success", toast);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView contentContainerStyle={{ backgroundColor: "#7E57C2" }}>
        <View style={{ padding: 20 }}>
          {user?.profile ? (
            <Image
              source={{
                uri: user?.profile,
              }}
              style={styles.imageDimensions}
            />
          ) : (
            <Image source={require("../assets/anas-ai.jpeg")} style={styles.imageDimensions} />
          )}
          <Text style={styles.userText}>{user?.name}</Text>
          <Text style={[styles.userText, { fontSize: 12, fontFamily: "Roboto_400Regular" }]}>{user?.role}</Text>
        </View>

        <View style={styles.drawerList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="share-social-outline" size={22} color="#7E57C2" />
            <Text style={{ fontSize: 15, fontFamily: "Roboto_400Regular" }}>Share</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ paddingVertical: 15, flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Ionicons name="log-out-outline" size={22} color="#7E57C2" />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageDimensions: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },

  userText: {
    color: "#fff",
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    textTransform: "capitalize",
  },

  drawerList: {
    flex: 1,
    backgroundColor: "#fff",
  },

  bottomSection: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});
