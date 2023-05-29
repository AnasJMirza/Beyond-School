import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../navigation/Routes";
import FormInput from "../components/FormInput";
import { Controller, useForm } from "react-hook-form";
import FreeMentorCard from "../components/FreeMentorCard";
import { ScrollView } from "native-base";
import axios from "../axios";
import ProMentorCard from "../components/ProMentorCard";
import MeetingCard from "../components/MeetingCard";

const Home = ({ navigation }) => {
  // function to add suffix with the current date
  const addSuffixToDay = (date) => {
    if (date > 3 && date < 21) return date + "th";
    switch (date % 10) {
      case 1:
        return date + "st";
      case 2:
        return date + "nd";
      case 3:
        return date + "rd";
      default:
        return date + "th";
    }
  };

  const [mentors, setMentors] = useState([]);

  // code to get the current date to show on profile section
  const currentDate = new Date();
  const options = {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);
  const formattedDateWithSuffix = formattedDate.replace(/\d+/, addSuffixToDay(formattedDate.match(/\d+/)[0]));

  // react-hooks-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchTerm: "",
    },
  });

  // fetch mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("/user/get-mentors");
        setMentors(response.data.mentors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentors();
  }, []);

  console.log(mentors);

  const { user, setUser } = useContext(UserContext);
  console.log("-->", user);

  return (
    <>
      {user.role == "mentor" ? (
        <SafeAreaView>
          <Text
            style={{ fontFamily: "Roboto_700Bold", color: "#212121", fontSize: 30, marginVertical: 10, marginLeft: 10 }}
          >
            All Meetings
          </Text>
          <ScrollView style={{ paddingBottom: 20 }}>
            <MeetingCard />
            <MeetingCard />
            <MeetingCard />
            <MeetingCard />
            <MeetingCard />
            <MeetingCard />
            <MeetingCard />
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          {/* Profile Section Details */}
          <View style={styles.profileDetailsSection}>
            <View style={styles.userInformation}>
              <View>
                <Text style={styles.profileDate}>{formattedDateWithSuffix}</Text>
                <Text style={styles.profileGreetings}>Hello, {user.name}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                {user?.profile ? (
                  <Image
                    source={{
                      uri: user?.profile,
                    }}
                    style={styles.imageDimensions}
                  />
                ) : (
                  <Image source={require(`../assets/anas-ai.jpeg`)} style={styles.imageDimensions} />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Controller
                name="searchTerm"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    placeholder="Search for mentors"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>

          <View style={{ flex: 3, marginHorizontal: 8 }}>
            <ScrollView>
              <View>
                <Text style={styles.heading}>Explore Mentors 👨‍🏫</Text>
                <ScrollView horizontal={true}>
                  {mentors.map((mentor, index) => {
                    if (!mentor.varified) {
                      return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate("mentor", mentor)}>
                          <FreeMentorCard mentor={mentor} />
                        </TouchableOpacity>
                      );
                    }
                  })}
                </ScrollView>
              </View>

              <Text style={styles.heading}>Varified Mentors 🏫👨‍🏫</Text>

              <View>
                {mentors.map((mentor, index) => {
                  if (mentor.varified) {
                    return (
                      <TouchableOpacity key={index} onPress={() => navigation.navigate("mentor", mentor)}>
                        <ProMentorCard mentor={mentor} />
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  },

  profileDetailsSection: {
    flex: 1.1,
    backgroundColor: "#7E57C2",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  profileDate: {
    color: "#ffffff",
  },

  profileGreetings: {
    fontSize: 36,
    color: "#ffffff",
    fontWeight: 900,
    textTransform: "capitalize",
  },

  imageDimensions: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
  },

  freeMentorsDetails: {
    backgroundColor: "#66ca62",
    width: 130,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },

  proMentorsDetails: {
    backgroundColor: "#4e81bb",
    height: 170,
    borderRadius: 8,
    marginBottom: 10,
  },

  heading: {
    fontSize: 24,
    fontWeight: 900,
    color: "#000",
    marginVertical: 10,
  },
});
