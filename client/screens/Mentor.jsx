import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ScrollView } from "native-base";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserContext } from "../navigation/Routes";
import axios from "../axios";

const Mentor = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const route = useRoute();
  const mentor = route.params;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("empty");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    const fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setText(fDate + " " + fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const requestMeeting = async () => {
    const data = {
      dateTime: text,
      userName: user.name,
      userEmail: user.email,
      mentorId: mentor._id,
    };

    try {
      const res = await axios.post("/user/request-meeting", data);
      console.log("res", res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.mentorDetailsWrapper} onPress={() => navigation.openDrawer()}>
          {mentor.profile ? (
            <Image
              source={{
                uri: mentor?.profile,
              }}
              style={styles.imageDimentions}
            />
          ) : (
            <Image source={require("../assets/anas-ai.jpeg")} style={styles.imageDimentions} />
          )}
          <Text style={styles.mentorName}>{mentor?.name}</Text>
          <Text style={styles.mentorRole}>{mentor?.designation}</Text>
        </TouchableOpacity>

        <View style={styles.info}>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={{ color: "#fff", fontFamily: "Roboto_400Regular" }}>
              {mentor?.varified ? "Varified" : "Un-Varified"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={{ color: "#fff", fontFamily: "Roboto_400Regular" }}>{mentor.country}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30, width: "100%" }}>
          <View style={styles.extraInformation}>
            <Text style={styles.extraInfoText}>Experience</Text>
            <Text style={styles.extraInfoText}>{mentor?.experience} Years</Text>
          </View>
          <View style={styles.extraInformation}>
            <Text style={styles.extraInfoText}>Rating</Text>
            <Text style={styles.extraInfoText}>{mentor?.rating}</Text>
          </View>
          <View style={styles.extraInformation}>
            <Text style={styles.extraInfoText}>Speacilization</Text>
            <Text style={styles.extraInfoText}>{mentor?.speciality}</Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity onPress={() => showMode("date")} style={styles.dateTimeButton}>
                <Text style={styles.dateTimeText}>Select Date</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showMode("time")} style={styles.dateTimeButton}>
                <Text style={styles.dateTimeText}>Select Time</Text>
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <TouchableOpacity style={styles.requestButton} onPress={() => requestMeeting()}>
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
  dateTimeButton: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 3,
    backgroundColor: "#7E57C2",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    marginBottom: 2,
  },

  dateTimeText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Roboto_400Regular",
  },
});
