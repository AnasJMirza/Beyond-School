import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import Line from "../components/Line";
import axios from "../axios";
import { useForm, Controller } from "react-hook-form";
import { Platform } from "react-native";
import { useToast, Spinner, Heading, Box } from "native-base";
import { UserContext } from "../navigation/Routes";
import { toaster } from "../utils/helper";

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const { setUser } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    setModalVisible(true);
    try {
      const response = await axios.post("/user/login", data);
      setUser(response?.data?.response);
      const title = "Login Successful";
      toaster(title, "success", toast);
    } catch (error) {
      console.log(error);
      const title = error?.response?.data;
      toaster(title, "error", toast);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    // <ScrollView>
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/main/logo-transparent.png")}
        style={styles.imageDimensions}
      />
      <View>
        <Text style={styles.heading}>Hello Again!</Text>
      </View>

      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            placeholder="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <View style={{ width: "100%", marginTop: -8, marginBottom: 6 }}>
          <Text style={styles.errorText}>Email is required.</Text>
        </View>
      )}

      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
          minLength: 8,
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
        <View style={{ width: "100%", marginTop: -8 }}>
          <Text style={styles.errorText}>
            Password must be 8 characters long.
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.recoverPasswordTextWrapper}>
        <Text style={styles.recoverPasswordText}>Recover password</Text>
      </TouchableOpacity>

      <FormButton title="Sign in" onPress={handleSubmit(onSubmit)} />

      <Line />

      {Platform.OS === "android" && (
        <>
          <SocialButton
            title="Sign In with Google"
            iconUrl="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
          />
          <SocialButton
            title="Sign In with Facebook"
            iconUrl="https://www.facebook.com/images/fb_icon_325x325.png"
          />
        </>
      )}

      <View style={styles.registerContainer}>
        <Text>Not a member</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}

      {modalVisible && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#f5f0ff",
            // opacity: 0.4,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            direction: "column",
          }}
        >
          <Spinner size="lg" color="#7E57C2" />
          <Heading color="#7E57C2" fontSize="lg">
            Loading
          </Heading>
        </View>
      )}
    </SafeAreaView>
    // </ScrollView>
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
    // fontFamily: "anas",
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

  errorText: {
    color: "#f74444",
    textAlign: "left",
  },
});
