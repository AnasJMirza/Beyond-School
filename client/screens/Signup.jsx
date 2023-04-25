import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput";
import Line from "../components/Line";
import SocialButton from "../components/SocialButton";
import FormButton from "../components/FormButton";
import { useToast } from "native-base";
import axios from "../axios";
import { Controller, useForm } from "react-hook-form";
import DropDownPicker from 'react-native-dropdown-picker';

const Signup = ({ navigation }) => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data) => console.log(data)

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/main/logo-transparent.png")}
          style={styles.imageDimensions}
        />
        <View>
          <Text style={styles.heading}>Create Account</Text>
        </View>

        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          aria-invalid={errors.email ? "true" : "false"} 
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={"anas"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <View style={{ width: "100%", marginTop: -8, marginBottom: 6 }}>
            <Text style={styles.errorText}>{errors.email?.message}</Text>
          </View>
        )}

        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Password"
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          />
          {errors.password && (
            <View style={{ width: "100%", marginTop: -8, marginBottom: 6 }}>
              <Text style={styles.errorText}>Password must be 6 character long</Text>
            </View>
          )}
        <FormInput placeholder="Confirm Password" secureTextEntry={true} />
        <TouchableOpacity style={styles.recoverPasswordTextWrapper}>
          <Text
            style={styles.recoverPasswordText}
            onPress={() => alert("Terms and services")}
          >
            By registering, you confirm that you accept our{" "}
            <Text style={styles.specialColorText}>term of service</Text> and{" "}
            <Text
              style={styles.specialColorText}
              onPress={() => alert("Privay Policy")}
            >
              privacy ploicy
            </Text>
          </Text>
        </TouchableOpacity>

        <FormButton title="Register" onPress={handleSubmit(onSubmit)} />

        <Line />

        {Platform.OS === "android" && (
          <>
            <SocialButton
              title="Sign up with Google"
              iconUrl="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            />
            <SocialButton
              title="Sign up with Facebook"
              iconUrl="https://www.facebook.com/images/fb_icon_325x325.png"
            />
          </>
        )}

        <View style={styles.registerContainer}>
          <Text>Already have a account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.registerText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 20,
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
    paddingHorizontal: 30,
    paddingVertical: 5,
  },

  recoverPasswordText: {
    fontSize: 12,
    fontWeight: 900,
    color: "#333",
    textAlign: "center",
  },

  registerContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },

  registerText: {
    color: "#7E57C2",
    fontWeight: 900,
  },

  specialColorText: {
    color: "#7E57C2",
  },

  errorText: {
    color: "#f74444",
    textAlign: "left",
  }
});
