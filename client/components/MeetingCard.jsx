import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import axios from "../axios";

const MeetingCard = ({ meeting }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleAccept = async (mentorEmail, studentEmail) => {
    const link = `
      Join Zoom Meeting <br>
      Date - Time: ${meeting?.dateTime} <br>


      Join Zoom Meeting: <br>
      https://zoom.us/j/1234567890?pwd=ABC123xyz <br>

      Meeting ID: 123 456 7890 <br>
      Passcode: ABC123xyz <br>

      Please make sure to install the Zoom application on your device prior to the meeting. We look forward to seeing you there! <br>

      Best regards,

`;
    setIsAccepted(true);
    const data = {
      mentorEmail,
      studentEmail,
      link,
    };
    console.log(data);

    try {
      const res = await axios.post("/user/send-link", data);
      // console.log("res", res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (studentEmail) => {
    const data = {
      studentEmail,
    };
    console.log(data);
    setIsRejected(true);
    try {
      const res = await axios.post("/user/reject-link", data);
      // console.log("res", res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Meeting Request</Text>
        <Text style={[styles.text, { textTransform: "lowercase" }]}>{meeting?.userEmail}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Date Time</Text>
        <Text style={styles.text}>{meeting?.dateTime}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>student name</Text>
        <Text style={styles.text}>{meeting?.userName}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
        {!isRejected && (
          <TouchableOpacity
            style={{ paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3, backgroundColor: "#fff", flex: 1 }}
            onPress={isAccepted ? null : () => handleAccept(meeting?.mentorEmail, meeting?.userEmail)}
          >
            {isAccepted ? <Text>Accepted</Text> : <Text>Accept</Text>}
          </TouchableOpacity>
        )}
        {!isAccepted && (
          <TouchableOpacity
            style={{ paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3, backgroundColor: "#fff", flex: 1 }}
            onPress={() => handleReject(meeting?.userEmail)}
          >
            {isRejected ? <Text>Rejected</Text> : <Text>Reject</Text>}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MeetingCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7E57C2",
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 4,
    borderBottomWidth: 1,
    borderColor: "#bbbbbb",
  },

  text: {
    color: "#fff",
    fontFamily: "Roboto_400Regular",
    textTransform: "capitalize",
  },
});
