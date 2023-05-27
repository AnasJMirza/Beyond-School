import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput";
import Line from "../components/Line";
import SocialButton from "../components/SocialButton";
import FormButton from "../components/FormButton";
import { useToast } from "native-base";
import axios from "../axios";
import { Controller, useForm } from "react-hook-form";
import { toaster } from "../utils/helper";
import { RadioButton, RadioGroup } from "react-native-ui-lib";
import * as ImagePicker from "expo-image-picker";

const Signup = ({ navigation }) => {
  const toast = useToast();

  const [image, setImage] = useState(null);
  const [role, setRole] = useState("student");
  const [cloudinaryImage, setCloudinaryImage] = useState(null);
  const [progress, setProgress] = useState(1);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadProfileImage(result.assets[0].uri);
    }
  };

  const uploadProfileImage = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: uri,
        name: "profileImage.jpeg",
        type: "image/jpeg",
      });
      const response = await axios.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        onUploadProgress: ({ loaded, total }) => {
          setProgress(Number(loaded) / Number(total));
          // console.log(Number(loaded) / Number(total));
        },
      });
      setCloudinaryImage(response?.data?.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/user/register", { ...data, profile: cloudinaryImage });
      navigation.navigate("login");
      const title = "Account Created Successfully";
      toaster(title, "success", toast);
      console.log({ ...data, profile: cloudinaryImage });
    } catch (error) {
      console.log(error);
      const title = error?.response?.data?.error;
      toaster(title, "error", toast);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.heading}>Create Account</Text>
        </View>

        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imageDimensions} />
          ) : (
            <Image source={require("../assets/user.png")} style={styles.imageDimensions} />
          )}
        </TouchableOpacity>

        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Name"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={""}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && (
          <View style={{ width: "100%", marginTop: -8, marginBottom: 6 }}>
            <Text style={styles.errorText}>Name is a required</Text>
          </View>
        )}

        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
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
            <Text style={styles.errorText}>Email is a required</Text>
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

        <Controller
          name="role"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              initialValue={role}
              onValueChange={(value) => {
                setRole(value);
                onChange(value);
              }}
              style={{ flexDirection: "row", width: "100%", gap: 10 }}
            >
              <RadioButton value={"mentor"} label={"Mentor"} />
              <RadioButton value={"student"} label={"Student"} />
            </RadioGroup>
          )}
        />
        {errors.role && (
          <View style={{ width: "100%", marginTop: -8, marginBottom: 6 }}>
            <Text style={styles.errorText}>Role is a required</Text>
          </View>
        )}

        <TouchableOpacity style={styles.recoverPasswordTextWrapper}>
          <Text style={styles.recoverPasswordText} onPress={() => alert("Terms and services")}>
            By registering, you confirm that you accept our <Text style={styles.specialColorText}>term of service</Text>{" "}
            and{" "}
            <Text style={styles.specialColorText} onPress={() => alert("Privay Policy")}>
              privacy ploicy
            </Text>
          </Text>
        </TouchableOpacity>

        {progress == 1 ? (
          <View style={{ position: "relative", zIndex: -1, width: "100%" }}>
            <FormButton title="Register" onPress={handleSubmit(onSubmit)} />
          </View>
        ) : (
          <View style={{ position: "relative", zIndex: -1, width: "100%" }}>
            <FormButton title="Uploading Image" />
          </View>
        )}

        <View style={{ position: "relative", zIndex: -1 }}>
          <Line />
        </View>

        {Platform.OS === "android" && (
          <>
            <SocialButton
              title="Sign up with Google"
              iconUrl="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
            />
            <SocialButton title="Sign up with Facebook" iconUrl="https://www.facebook.com/images/fb_icon_325x325.png" />
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
    width: 100,
    height: 100,
    borderColor: "#7E57C2",
    borderWidth: 3,
    borderRadius: 50,
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
    position: "relative",
    zIndex: -1,
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
    marginBottom: 20,
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
  },

  dropDown: {
    outline: "none",
  },
});
