import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

const OnBoard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Onboarding
        bottomBarHighlight={false}
        onSkip={() => navigation.navigate("login")}
        onDone={() => navigation.navigate("login")}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../assets/onboard/lost.png")}
                style={styles.imageDimensions}
              />
            ),
            title: " Indecisive and Confused? 💭",
            subtitle:
              "Feeling uncertain about which path to take to establish a fulfilling career?",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../assets/onboard/help.png")}
                style={styles.imageDimensions}
              />
            ),
            title:
              "Get guidance from accomplished professionals of industry 💡",
            subtitle:
              "Considering the achievements and lessons of those who have succeeded in your field",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../assets/onboard/success.png")}
                style={styles.imageDimensions}
              />
            ),
            title: "Navigate to the best Path with Confidence! 🚀",
            subtitle:
              "Unleash Your Full Potential! Choose Your Path to Success with Confidence!",
          },
        ]}
      />
    </View>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageDimensions: {
    width: 350,
    height: 305,
  },
});
