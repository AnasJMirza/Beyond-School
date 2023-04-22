import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import Line from "../components/Line";

const Login = ({ navigation }) => {

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/main/logo-transparent.png")}
        style={styles.imageDimensions}
      />
      <View>
        <Text style={styles.heading}>Hello Again!</Text>
      </View>

      <FormInput
        placeholder="Username"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity style={styles.recoverPasswordTextWrapper}>
        <Text style={styles.recoverPasswordText}>Recover password</Text>
      </TouchableOpacity>

      <FormButton title="Sign in" />

      <Line />

      <SocialButton
        title="Sign In with Google"
        iconUrl="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
      />
      <SocialButton
        title="Sign In with Facebook"
        iconUrl="https://www.facebook.com/images/fb_icon_325x325.png"
      />

      <View style={styles.registerContainer}>
        <Text>Not a member</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f5f0ff",
  },

  imageDimensions: {
    width: 150,
    height: 150,
  },

  heading: {
    fontSize: 30,
    fontWeight: 900,
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
    
  },


  recoverPasswordTextWrapper: {
    width: "100%",
  },

  recoverPasswordText: {
    fontSize: 12,
    fontWeight: 900,
    color: "#333",
    textAlign: "right",
  },

  registerContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },

  registerText: {
    color: "#7E57C2",
    fontWeight: 900,
  },
});
