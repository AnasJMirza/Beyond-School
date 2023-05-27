import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "native-base";


const Mentor = ({ navigation }) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.mentorDetailsWrapper}>
          <Image source={require("../assets/anas-ai.jpeg")} style={styles.imageDimentions} />
          <Text style={styles.mentorName}>Anas Mirza</Text>
          <Text style={styles.mentorRole}>Software Engineer</Text>
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={{ color: "#fff", fontFamily: "Roboto_400Regular" }}>Varified!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={{ color: "#fff", fontFamily: "Roboto_400Regular" }}>Pakistan</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30, width: "100%" }}>
          <View style={styles.extraInformation}>
            <Text style={styles.extraInfoText}>Experience</Text>
            <Text style={styles.extraInfoText}>10 Years</Text>
          </View>
          <View style={styles.extraInformation}>
            <Text style={styles.extraInfoText}>Rating</Text>
            <Text style={styles.extraInfoText}>4.8/5</Text>
          </View>
          <View style={styles.extraInformation}>
            <Text style={styles.extraInfoText}>Speacilization</Text>
            <Text style={styles.extraInfoText}>Computer Science</Text>
          </View>
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestText}>Request Meeting</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Mentor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  mentorDetailsWrapper: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  mentorName: {
    fontSize: 40,
    marginTop: 20,
    fontFamily: "Roboto_900Black",
  },
  mentorRole: { fontSize: 20, fontFamily: "Roboto_400Regular" },
  imageDimentions: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#7E57C2",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    marginTop: 10,
  },

  infoButton: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 2,
    backgroundColor: "#7E57C2",
  },

  extraInformation: {
    backgroundColor: "#7E57C2",
    width: "100%",
    height: 60,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 2,
  },

  requestButton: {
    backgroundColor: "#6f71ff",
    width: "100%",
    height: 40,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 2,
  },

  requestText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Roboto_700Bold",
  },

  extraInfoText: {
    color: "#fff",
    fontFamily: "Roboto_400Regular",
  },
});
