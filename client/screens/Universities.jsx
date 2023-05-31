import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import UniCard from "../components/UniCard";
import { UserContext } from "../navigation/Routes";
import { LoaderScreen } from "react-native-ui-lib";

const Universities = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [unis, setUnis] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    try {
      setLoader(true);
      const fetchData = async () => {
        const res = await axios.get("http://universities.hipolabs.com/search?name=middle");
        setUnis(res.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
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
      <Text
        style={{ fontSize: 30, fontFamily: "Roboto_700Bold", color: "#212121", marginVertical: 10, marginLeft: 10 }}
      >
        Top Universities 🏫
      </Text>
      {loader ? (
        <LoaderScreen message={"Loading..."} color={"#7E57C2"} />
      ) : (
        <ScrollView style={{ width: "100%", padding: 10, marginBottom: 20 }}>
          {unis?.map((uni, index) => (
            <UniCard key={index} uni={uni} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Universities;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },

  bg: {
    width: "100%",
    height: 100,
    backgroundColor: "#7E57C2",
    alignItems: "center",
    paddingTop: 10,
  },

  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#fff",
    position: "absolute",
    bottom: -50,
    left: "90%",
    transform: [{ translateX: -90 }],
  },
});
