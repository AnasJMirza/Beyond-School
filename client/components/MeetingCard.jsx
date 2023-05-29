import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MeetingCard = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Meeting Request</Text>
        <Text style={styles.text}>Anas</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Date</Text>
        <Text style={styles.text}>27th, May</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Time</Text>
        <Text style={styles.text}>12:00 PM</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
        <TouchableOpacity
          style={{ paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3, backgroundColor: "#fff", flex: 1 }}
        >
          <Text>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3, backgroundColor: "#fff", flex: 1 }}
        >
          <Text>Reject</Text>
        </TouchableOpacity>
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
  },
});
